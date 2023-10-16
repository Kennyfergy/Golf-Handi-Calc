import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserPage() {
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  //const userId = useSelector((store) => store.userReducer.id);

  useEffect(() => {
    dispatch({ type: "FETCH_HANDICAP", payload: user.id });
  }, []);

  const user = useSelector((store) => store.user);
  const handicapData = useSelector((store) => store.handicapReducer);

  console.log("logging handicap data in userpage", handicapData);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Handicap Index: {user.user_handicap}</p>
    </div>
  );
}

export default UserPage;
