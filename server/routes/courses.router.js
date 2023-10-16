const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Routes related to user courses
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const queryText = `
        SELECT * FROM user_courses WHERE user_id = $1;
    `;

  pool.query(queryText, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching user courses:", error);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results.rows);
    }
  });
});

router.post("/:userId", (req, res) => {
  const userId = req.params.userId;

  const {
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

  // add validation here

  const queryText = `
        INSERT INTO user_courses (user_id, course_name, course_location, men_course_rating, men_course_slope, men_front_9_par, men_back_9_par, women_course_rating, women_course_slope, women_front_9_par, women_back_9_par)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;

  pool.query(
    queryText,
    [
      userId,
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
});

//put route to update course information
router.put("/:courseId", (req, res) => {
  const courseId = req.params.courseId;

  const {
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

  const queryText = `
        UPDATE user_courses 
        SET course_name = $1, course_location = $2, men_course_rating = $3, men_course_slope = $4, men_front_9_par = $5, men_back_9_par = $6, women_course_rating = $7, women_course_slope = $8, women_front_9_par = $9, women_back_9_par = $10
        WHERE id = $11;
    `;

  pool.query(
    queryText,
    [
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
});
//delete route to remove course with specific courseId
router.delete("/:courseId", (req, res) => {
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
});

module.exports = router;