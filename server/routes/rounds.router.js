const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  calculateHandicap,
  calculateCourseHandicap,
} = require("../modules/helperFunctions.module");
const {
  calculateRoundScoreDifferential,
} = require("../modules/CalculateRoundScoreDifferential.module");

// This page contains routes related to user rounds

//get route to /rounds to get all rounds for the user
router.get("/", rejectUnauthenticated, (req, res) => {
  // Check if the user is authenticated and there's a user object in the request
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const userId = req.user.id;

  `SELECT * FROM user_rounds WHERE user_id = $1 ORDER BY "date" DESC`,
    pool.query(
      `SELECT ur.id, ur.user_id, ur.date, ur.front_9_score, ur.back_9_score, ur.course_id, uc.course_name, ur.score_differential  FROM user_rounds AS ur
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

// posts rounds to the database
router.post("/", rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  // Extract round details from the request body
  const userId = req.user.id;
  const courseId = req.body.course_id;
  const front9Score = parseInt(req.body.front_9_score, 10);
  const back9Score = parseInt(req.body.back_9_score, 10);
  const dateValue = req.body.date || new Date().toISOString();

  //validation
  if (
    isNaN(front9Score) ||
    isNaN(back9Score) ||
    front9Score < 0 ||
    back9Score < 0
  ) {
    res.status(400).json({ error: "Invalid or missing scores" });
    return;
  }

  try {
    await pool.query(
      "INSERT INTO user_rounds (user_id, date, front_9_score, back_9_score, course_id, score_differential) VALUES ($1, $2, $3, $4, $5, 0)",
      [userId, dateValue, front9Score, back9Score, courseId]
    );

    const round = await pool.query(
      "SELECT id FROM user_rounds ORDER BY id DESC LIMIT 1"
    );

    // update and persist the round differential and handicap index
    calculateRoundScoreDifferential(round.rows[0].id);
    calculateHandicap(userId);

    res.json({ message: "Round submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}); // end POST

//put route to update a users round
router.put("/:roundId", rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  // Extract round details from the request body
  const roundId = req.params.roundId;
  const userId = req.user.id;
  const front9Score = parseInt(req.body.front_9_score, 10);
  const back9Score = parseInt(req.body.back_9_score, 10);
  const dateValue = req.body.date || new Date().toISOString();
  console.log(req.params);

  try {
    const queryText = `UPDATE user_rounds SET date = $1, front_9_score = $2, back_9_score = $3 WHERE id = $4`;

    await pool.query(queryText, [dateValue, front9Score, back9Score, roundId]);

    // update and persist the round differential and handicap index
    calculateRoundScoreDifferential(roundId);
    calculateHandicap(userId);

    res.json({ message: "Round updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}); //end router.put

//delete route to delete from round with specific round id
router.delete("/:roundId", rejectUnauthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  // Extract round ID from the request parameters
  const roundId = req.params.roundId;
  const userId = req.user.id;

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
      calculateHandicap(userId);
      res.sendStatus(200); // 200 OK
    }
  });
}); //end router.delete

module.exports = router;
