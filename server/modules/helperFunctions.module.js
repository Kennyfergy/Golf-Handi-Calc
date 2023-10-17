const pool = require("./pool");

//this function cuts off everything after the first decimal point, necessary for handicap calculation rather than rounding.
function truncateToDecimalPlace(num, decimalPlaces) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.trunc(num * multiplier) / multiplier;
}

// get route to grab data required, then calculate a users handicap index
async function calculateHandicap(userId) {
  // Fetch last 20 rounds of golf scores, related course data, and user gender from the database
  const result = await pool.query(
    `
        SELECT 
          ur.front_9_score, ur.back_9_score, 
          uc.men_course_rating, uc.men_course_slope, 
          uc.women_course_rating, uc.women_course_slope,
          u.is_male
        FROM user_rounds ur 
        JOIN user_courses uc ON ur.course_id = uc.id
        JOIN users u ON ur.user_id = u.id
        WHERE ur.user_id = $1 
        ORDER BY ur.date DESC 
        LIMIT 20`,
    [userId]
  );

  // Calculate score differentials considering gender
  const scoreDifferentials = result.rows.map((row) => {
    const totalScore = row.front_9_score + row.back_9_score;
    const courseRating = row.is_male
      ? row.men_course_rating
      : row.women_course_rating;
    const courseSlope = row.is_male
      ? row.men_course_slope
      : row.women_course_slope;
    const scoreDifferential = ((totalScore - courseRating) * 113) / courseSlope;
    return scoreDifferential;
  });

  // Sort score differentials, select depending on number of rounds in database, and calculate average
  scoreDifferentials.sort((a, b) => a - b);

  let bestDifferentials;
  const numRounds = scoreDifferentials.length;

  if (numRounds <= 3) {
    bestDifferentials = scoreDifferentials.slice(0, 1); //if 3 rounds, only use best 1 round
  } else if (numRounds <= 5) {
    bestDifferentials = scoreDifferentials.slice(0, 1);
  } else if (numRounds <= 8) {
    bestDifferentials = scoreDifferentials.slice(0, 2); //if 8 rounds, only use best 2
  } else if (numRounds <= 10) {
    bestDifferentials = scoreDifferentials.slice(0, 3);
  } else if (numRounds <= 12) {
    bestDifferentials = scoreDifferentials.slice(0, 4);
  } else if (numRounds <= 14) {
    bestDifferentials = scoreDifferentials.slice(0, 5);
  } else if (numRounds <= 16) {
    bestDifferentials = scoreDifferentials.slice(0, 6);
  } else if (numRounds <= 18) {
    bestDifferentials = scoreDifferentials.slice(0, 7);
  } else {
    bestDifferentials = scoreDifferentials.slice(0, 8);
  }

  const avgDifferential =
    bestDifferentials.reduce((a, b) => a + b, 0) / bestDifferentials.length;

  // Calculate and send the handicap index
  const handicapIndex = Math.min(54, Math.max(0, avgDifferential)); //max of 54 handicap, min of 0

  return truncateToDecimalPlace(handicapIndex, 1);
}

module.exports = {
  calculateHandicap,
};
