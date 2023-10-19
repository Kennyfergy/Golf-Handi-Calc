const pool = require("./pool");

async function calculateRoundScoreDifferential(roundId) {
  // We grab the round and related results
  const roundResults = await pool.query(
    "SELECT id, course_id, front_9_score, back_9_score FROM user_rounds WHERE user_rounds.id = $1",
    [roundId]
  );
  const round = roundResults.rows[0];

  // We get the user gender, as that changes some of our calculations
  const userGender = await pool.query(
    "SELECT is_male FROM user_courses LEFT JOIN users ON user_courses.user_id = users.id WHERE user_courses.id = $1 LIMIT 1",
    [round.course_id]
  );
  const isMale = userGender.rows[0].is_male;

  // Set up variables for our calculations
  let courseDetails = null;
  let courseRating = 0;
  let slopeRating = 0;
  let front9Score = round.front_9_score;
  let back9Score = round.back_9_score;
  let adjustedGrossScore = front9Score + back9Score;

  // We use male course ratings and slopes if male, otherwise female
  if (isMale) {
    courseDetails = await pool.query(
      "SELECT men_front_9_par, men_back_9_par, men_course_rating, men_course_slope FROM user_courses WHERE id = $1",
      [round.course_id]
    );
    courseRating = courseDetails.rows[0].men_course_rating;
    slopeRating = courseDetails.rows[0].men_course_slope;
  } else {
    courseDetails = await pool.query(
      "SELECT women_front_9_par, women_back_9_par, women_course_rating, women_course_slope FROM user_courses WHERE id = $1",
      [round.course_id]
    );
    courseRating = courseDetails.rows[0].women_course_rating;
    slopeRating = courseDetails.rows[0].women_course_slope;
  }

  // If only the front 9 score is provided
  if (front9Score > 0 && !back9Score) {
    courseRating = courseRating / 2;
    adjustedGrossScore = front9Score;
  }

  // If only the back 9 score is provided
  else if (!front9Score && back9Score > 0) {
    courseRating = courseRating / 2;
    adjustedGrossScore = back9Score;
  }

  // If both front 9 and back 9 scores are provided, use the full course rating
  let scoreDifferential = (
    ((adjustedGrossScore - courseRating) / slopeRating) *
    113
  ).toFixed(0);

  console.log("Score differential", scoreDifferential);

  //setting to minimum 0
  //TODO check if WHS allows negative
  if (scoreDifferential < 0) {
    scoreDifferential = 0;
  }

  await pool.query(
    "UPDATE user_rounds SET score_differential = $1 WHERE id = $2",
    [scoreDifferential, round.id]
  );
}

module.exports = {
  calculateRoundScoreDifferential,
};
