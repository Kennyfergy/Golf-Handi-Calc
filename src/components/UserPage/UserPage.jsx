import React from "react";

import { useSelector } from "react-redux";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  //const rounds = useSelector((store) => store.rounds) doesn't exist yet, may need it to grab total rounds played data
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Handicap Index: {user.user_handicap}</p>
    </div>
  );
}

export default UserPage;
