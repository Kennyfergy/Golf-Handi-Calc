import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({ type: "FETCH_ROUNDS" });
  }, []);
  const round = useSelector((store) => store.rounds);

  // useEffect(() => {
  //   dispatch({ type: "FETCH_USER" });
  // }, []);

  // Extract a list of course IDs from the rounds data
  const courseIdsPlayed = round.map((round) => round.course_id);
  // Convert this list into a set to get unique course IDs
  const uniqueCoursesPlayed = new Set(courseIdsPlayed);
  // The size of this set is the number of unique courses played
  const numberOfUniqueCoursesPlayed = uniqueCoursesPlayed.size;

  return (
    <div className="userPageBackground">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Handicap Index: {user.user_handicap}</p>
      <p>Rounds Played: {round.length}</p>
      <p>Courses Played: {numberOfUniqueCoursesPlayed}</p>
    </div>
  );
}

export default UserPage;
