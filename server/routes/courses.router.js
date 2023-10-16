const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
// routes related to user courses
router.get("/", (req, res) => {
  // TODO: Fetch all courses for the logged-in user
});

router.post("/", (req, res) => {
  // TODO: Add a new course for the logged-in user
});

// put and delete

module.exports = router;
