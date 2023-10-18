import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  // console.log(user);
  //const rounds = useSelector((store) => store.rounds); //doesn't exist yet, may need it to grab total rounds played data
  //TODO component to display rounds, import here, get total count and display here

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
