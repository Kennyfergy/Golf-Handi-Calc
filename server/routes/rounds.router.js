const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { calculateHandicap } = require("../modules/helperFunctions.module");

// This page contains routes related to user rounds

//get route to /rounds to get all rounds for the user
router.get("/", (req, res) => {
  // Check if the user is authenticated and there's a user object in the request
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const userId = req.user.id;

  //   SELECT
  //   user_rounds.id, user_rounds.date, user_rounds.front_9_score,
  //   user_rounds.back_9_score, user_courses.course_name, user_rounds.course_handicap
  // FROM
  //   user_rounds
  // JOIN
  //   user_courses ON user_rounds.course_id = user_courses.id
  // WHERE
  //   user_rounds.user_id = [USER_ID];
  `SELECT * FROM user_rounds WHERE user_id = $1 ORDER BY "date" DESC`,
    pool.query(
      `SELECT ur.id, ur.user_id, ur.date, ur.front_9_score, ur.back_9_score, ur.course_id, uc.course_name  FROM user_rounds AS ur
    JOIN user_courses AS uc ON ur.course_id = uc.id
    WHERE ur.user_id = $1
    ORDER BY "date" DESC
    ;`,
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error fetching user rounds:", error);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json(results.rows);
        }
      }
    );
}); //end router.get

//route to add a new round for the user
router.post("/", async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const userId = req.user.id; //change from user to params for postman testing

    // Extract round details from the request body
    const dateValue = req.body.date || new Date().toISOString();
    const front9 = req.body.front_9_score;
    const back9 = req.body.back_9_score;
    const courseId = req.body.course_id;
    const courseHdcp = req.body.course_handicap || 0.0;
    //console.log("request.params", req.params); //for postman
    // console.log("request.body", req.body);

    console.log("Inserting round data:", {
      userId,
      dateValue,
      front9,
      back9,
      courseId,
      courseHdcp,
    });

    //data validation
    if (
      front9 === null ||
      front9 === undefined ||
      back9 === null ||
      back9 === undefined ||
      courseId === null ||
      courseId === undefined
    ) {
      res.status(400).json({ error: "Required fields are missing" });
      return;
    }
    // SQL query to insert the new round into the user_rounds table
    const queryText = `
      INSERT INTO user_rounds (user_id, date, front_9_score, back_9_score, course_id, course_handicap)
      VALUES ($1, $2, $3, $4, $5, $6);
  `;

    await pool.query(queryText, [
      userId,
      dateValue,
      front9,
      back9,
      courseId,
      courseHdcp,
    ]);

    //calculate handicap after inserting the round
    const handicap = await calculateHandicap(userId);
    // Update the user's handicap in the users table
    const updateHandicapQuery = `
      UPDATE users 
      SET user_handicap = $1
      WHERE id = $2;
    `;
    await pool.query(updateHandicapQuery, [handicap, userId]);

    res.sendStatus(201); // 201 Created
  } catch (err) {
    console.log("error updating handicap", err);
    res.sendStatus(500);
  }
}); //end router.post

//put route to update a users round
router.put("/:roundId", (req, res) => {
  // Extract round details from the request body
  const dateValue = req.body.date || new Date().toISOString();
  const front9 = req.body.front_9_score;
  const back9 = req.body.back_9_score;

  // Extract round ID from the request parameters
  const roundId = req.params.roundId;

  // console.log(req.body);

  // Validating data
  if (
    front9 === null ||
    front9 === undefined ||
    back9 === null ||
    back9 === undefined
  ) {
    res.status(400).json({ error: "Required fields are missing" });
    return;
  }

  // SQL query to update the specified round in the user_rounds table
  const queryText = `
        UPDATE user_rounds 
        SET date = $1, front_9_score = $2, back_9_score = $3
        WHERE id = $4;
    `;

  pool.query(
    queryText,
    [dateValue, front9, back9, roundId],
    (error, results) => {
      if (error) {
        console.error("Error updating the round:", error);
        res.status(500).json({ error: "Database error" });
      } else {
        res.sendStatus(200); // 200 OK
        console.log("Router.put worked");
      }
    }
  );
}); //end router.put

//delete route to delete from round with specific round id
router.delete("/:roundId", (req, res) => {
  // Extract round ID from the request parameters
  const roundId = req.params.roundId;

  // SQL query to delete the specified round from the user_rounds table
  const queryText = `
        DELETE FROM user_rounds 
        WHERE id = $1;
    `;

  pool.query(queryText, [roundId], (error, results) => {
    if (error) {
      console.error("Error deleting the round:", error);
      res.status(500).json({ error: "Database error" });
    } else {
      res.sendStatus(200); // 200 OK
    }
  });
}); //end router.delete

module.exports = router;
