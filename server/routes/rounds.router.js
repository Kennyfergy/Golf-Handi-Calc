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
  //   if (!req.user) {
  //     res.status(401).json({ error: "Not authenticated" });
  //     return;
  //   }

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
router.put("/", (req, res) => {
  //TODO update round info
});
router.delete("/", (req, res) => {
  //TODO delete round
});
module.exports = router;
