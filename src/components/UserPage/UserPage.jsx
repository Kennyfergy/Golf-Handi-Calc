import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log(user);
  //const rounds = useSelector((store) => store.rounds) doesn't exist yet, may need it to grab total rounds played data

  // useEffect(() => {
  //   // Fetch the updated handicap when the component mounts
  //   dispatch({ type: "FETCH_USER_HANDICAP", payload: user.id });
  // }, [dispatch, user.id]); //dependency, will run this code for any user that logs in

  // useEffect(() => {
  //   dispatch({ type: "FETCH_USER" });
  // }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Handicap Index: {user.user_handicap}</p>
    </div>
  );
}

export default UserPage;
