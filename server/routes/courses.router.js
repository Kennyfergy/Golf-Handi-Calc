const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Routes related to user courses

//get route to grab all courses attached to user logged in
router.get("/", rejectUnauthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const userId = req.user.id;

  //grabbing all of the user created courses, and all courses the admin made
  const queryText = `
  SELECT * FROM user_courses WHERE user_id = $1 OR is_admin_course = true ORDER BY id DESC;
    `;

  pool.query(queryText, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching user courses:", error);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results.rows);
    }
  });
}); //end router.get

//route to add a new course
router.post("/", rejectUnauthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const {
    user_id,
    course_name,
    course_location,
    men_course_rating,
    men_course_slope,
    men_front_9_par,
    men_back_9_par,
    women_course_rating,
    women_course_slope,
    women_front_9_par,
    women_back_9_par,
  } = req.body;

  //adding all course data, only admins can add courses for all users to play
  const queryText = `
        INSERT INTO user_courses (user_id, course_name, course_location, men_course_rating, men_course_slope, men_front_9_par, men_back_9_par, women_course_rating, women_course_slope, women_front_9_par, women_back_9_par${
          req.user.is_admin ? ", is_admin_course" : ""
        })
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11${
          req.user.is_admin ? ", 'true'" : ""
        });
    `;

  pool.query(
    queryText,
    [
      user_id,
      course_name,
      course_location,
      men_course_rating,
      men_course_slope,
      men_front_9_par,
      men_back_9_par,
      women_course_rating,
      women_course_slope,
      women_front_9_par,
      women_back_9_par,
    ],
    (error, results) => {
      if (error) {
        console.error("Error inserting new course:", error);
        res.status(500).json({ error: "Database error" });
      } else {
        res.sendStatus(201); // 201 Created
      }
    }
  );
}); //end router.post

//put route to update course information
router.put("/:courseId", rejectUnauthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const courseId = req.params.courseId;

  const course = req.body;
  console.log("course req.body", course);

  const queryText = `
        UPDATE user_courses 
        SET course_name = $1, course_location = $2, men_course_rating = $3, men_course_slope = $4, men_front_9_par = $5, men_back_9_par = $6, women_course_rating = $7, women_course_slope = $8, women_front_9_par = $9, women_back_9_par = $10
        WHERE id = $11;
    `;

  pool.query(
    queryText,
    [
      course.course_name,
      course.course_location,
      course.men_course_rating,
      course.men_course_slope,
      course.men_front_9_par,
      course.men_back_9_par,
      course.women_course_rating,
      course.women_course_slope,
      course.women_front_9_par,
      course.women_back_9_par,
      courseId,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating the course:", error);
        res.status(500).json({ error: "Database error" });
      } else {
        res.sendStatus(200); // 200 OK
      }
    }
  );
}); //end router.put

//delete route to remove course with specific courseId
router.delete("/:courseId", rejectUnauthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const courseId = req.params.courseId;

  const queryText = `
        DELETE FROM user_courses
        WHERE id = $1;
    `;

  pool.query(queryText, [courseId], (error, results) => {
    if (error) {
      console.error("Error deleting the course:", error);
      res.status(500).json({ error: "Database error" });
    } else {
      res.sendStatus(200); // 200 OK
    }
  });
}); //end router.delete

module.exports = router;
