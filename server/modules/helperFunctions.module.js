const pool = require("./pool");

//this function cuts off everything after the first decimal point, necessary for handicap calculation rather than rounding.
function truncateToDecimalPlace(num, decimalPlaces) {
  const numberAsAString = num.toString();
  const [front, back] = numberAsAString.split(".");
  let fixedBack = 0;
  if (back) {
    fixedBack = back.slice(0, decimalPlaces);
  }

  return Number(front + "." + fixedBack);
}

// get route to grab data required, then calculate a users handicap index
async function calculateHandicap(userId) {
  let differentials = await pool.query(
    `WITH RankedDifferentials AS (
    SELECT 
        score_differential,
        ROW_NUMBER() OVER (ORDER BY score_differential ASC) AS rnum,
        COUNT(*) OVER () AS numRounds
    FROM user_rounds
    WHERE user_id = $1
)


SELECT 
    AVG(score_differential) AS avgDifferential
FROM RankedDifferentials
WHERE rnum <= 
    CASE 
        WHEN numRounds <= 3 THEN 1
        WHEN numRounds <= 5 THEN 1
        WHEN numRounds <= 8 THEN 2
        WHEN numRounds <= 10 THEN 3
        WHEN numRounds <= 12 THEN 4
        WHEN numRounds <= 14 THEN 5
        WHEN numRounds <= 16 THEN 6
        WHEN numRounds <= 18 THEN 7
        ELSE 8
    END;`,
    [userId]
  );

  // Calculate and send the handicap index
  let handicapIndex = Math.min(
    54,
    Math.max(0, differentials.rows[0].avgdifferential)
  ); //max of 54 handicap, min of 0

  const handicap = truncateToDecimalPlace(handicapIndex, 1);

  await pool.query("UPDATE users SET user_handicap = $1 WHERE id=$2", [
    handicap,
    userId,
  ]);
}

module.exports = {
  calculateHandicap,
};

// // Fetch last 20 rounds of golf scores, related course data, and user gender from the database
// await pool.query;
// let scoreDifferentials;

// // Sort score differentials, select depending on number of rounds in database, and calculate average
// scoreDifferentials.sort((a, b) => a - b);

// let bestDifferentials;
// const numRounds = scoreDifferentials.length;

// if (numRounds <= 3) {
//   bestDifferentials = scoreDifferentials.slice(0, 1); //if 3 rounds, only use best 1 round
// } else if (numRounds <= 5) {
//   bestDifferentials = scoreDifferentials.slice(0, 1);
// } else if (numRounds <= 8) {
//   bestDifferentials = scoreDifferentials.slice(0, 2); //if 8 rounds, only use best 2
// } else if (numRounds <= 10) {
//   bestDifferentials = scoreDifferentials.slice(0, 3);
// } else if (numRounds <= 12) {
//   bestDifferentials = scoreDifferentials.slice(0, 4);
// } else if (numRounds <= 14) {
//   bestDifferentials = scoreDifferentials.slice(0, 5);
// } else if (numRounds <= 16) {
//   bestDifferentials = scoreDifferentials.slice(0, 6);
// } else if (numRounds <= 18) {
//   bestDifferentials = scoreDifferentials.slice(0, 7);
// } else {
//   bestDifferentials = scoreDifferentials.slice(0, 8);
// }

// const avgDifferential =
//   bestDifferentials.reduce((a, b) => a + b, 0) / bestDifferentials.length;
