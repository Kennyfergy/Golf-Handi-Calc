const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
// Routes related to user rounds

//get route to /rounds to get all rounds for the user
router.get("/:id", (req, res) => {
  // Check if the user is authenticated and there's a user object in the request
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const userId = req.user.id;

  pool.query(
    "SELECT * FROM user_rounds WHERE user_id = $1",
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
});

router.post("/:id", (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const userId = req.params.id; //change from usr to params for postman testing

  // Extract round details from the request body
  //   const { date, front_9_score, back_9_score, course_id, course_handicap } =
  //     req.body;

  const dateValue = req.body.date || new Date().toISOString();
  const front9 = req.body.front_9_score;
  const back9 = req.body.back_9_score;
  const courseId = req.body.course_id;
  const courseHdcp = req.body.course_handicap;
  console.log("request.params", req.params);
  console.log("request.body", req.body);

  console.log("Inserting round data:", {
    userId,
    dateValue,
    front9,
    back9,
    courseId,
    courseHdcp,
  });

  //data validation
  if (!front9 || !back9 || !courseId || !courseHdcp) {
    res.status(400).json({ error: "Required fields are missing" });
    return;
  }
  // SQL query to insert the new round into the user_rounds table
  const queryText = `
        INSERT INTO user_rounds (user_id, date, front_9_score, back_9_score, course_id, course_handicap)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;

  pool.query(
    queryText,
    [userId, dateValue, front9, back9, courseId, courseHdcp],
    (error, results) => {
      if (error) {
        console.error("Error inserting new round:", error);
        res.status(500).json({ error: "Database error" });
      } else {
        res.sendStatus(201); // 201 Created
      }
    }
  );
});

router.put("/:roundId", (req, res) => {
  // Extract round details from the request body
  const dateValue = req.body.date || new Date().toISOString();
  const front9 = req.body.front_9_score;
  const back9 = req.body.back_9_score;
  const courseId = req.body.course_id;
  const courseHdcp = req.body.course_handicap;

  // Extract round ID from the request parameters
  const roundId = req.params.roundId;

  // Check for essential data
  if (!front9 || !back9 || !courseId || !courseHdcp) {
    res.status(400).json({ error: "Required fields are missing" });
    return;
  }

  // SQL query to update the specified round in the user_rounds table
  const queryText = `
        UPDATE user_rounds 
        SET date = $1, front_9_score = $2, back_9_score = $3, course_id = $4, course_handicap = $5
        WHERE id = $6;
    `;

  pool.query(
    queryText,
    [dateValue, front9, back9, courseId, courseHdcp, roundId],
    (error, results) => {
      if (error) {
        console.error("Error updating the round:", error);
        res.status(500).json({ error: "Database error" });
      } else {
        res.sendStatus(200); // 200 OK
      }
    }
  );
});

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
});

module.exports = router;
