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
// console.log("logging truncate", truncateToDecimalPlace(12.5444, 1));
//this function calculates a users handicap(playing handicap) for a specific course
function calculateCourseHandicap(handicapIndex, slopeRating) {
  // Calculate course handicap
  const courseHandicap = handicapIndex * (slopeRating / 113);

  // Truncate to one decimal place
  return truncateToDecimalPlace(courseHandicap, 1);
}

// get route to grab data required, then calculate a users handicap index
async function calculateHandicap(userId) {
  try {
    console.log("amirunning");
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

    // running the function to truncate handicap. ex: 15.4564 = 15.4
    const handicap = truncateToDecimalPlace(handicapIndex, 1);

    console.log(handicap);

    await pool.query("UPDATE users SET user_handicap = $1 WHERE id=$2", [
      handicap,
      userId,
    ]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  calculateHandicap,
  calculateCourseHandicap,
};
