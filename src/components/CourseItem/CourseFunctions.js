export function truncateToDecimalPlace(num, decimalPlaces) {
  const numberAsAString = num.toString();
  const [front, back] = numberAsAString.split(".");
  let fixedBack = 0;
  if (back) {
    fixedBack = back.slice(0, decimalPlaces);
  }
  return Number(front + "." + fixedBack);
}

export function calculateCourseHandicap(handicapIndex, slopeRating) {
  const courseHandicap = handicapIndex * (slopeRating / 113);
  return truncateToDecimalPlace(courseHandicap, 1);
}
