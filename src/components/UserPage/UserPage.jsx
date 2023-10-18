import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const rounds = useSelector((store) => store.rounds);
  console.log("logging fucking rounds", rounds);
  //TODO component to display rounds, import here, get total count and display here

  // useEffect(() => {
  //   dispatch({ type: "FETCH_USER" });
  // }, []);

  return (
    <div className="userPageBackground">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Handicap Index: {user.user_handicap}</p>
    </div>
  );
}

export default UserPage;
