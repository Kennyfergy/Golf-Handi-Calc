import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Rounds.css";
import Button from "@mui/material/Button";
import RoundsItem from "../RoundsItem/RoundsItem";

//need to update a users handicap index on this page as well, when updating
//need to update this page and somehow add the course name to the rounds displayed

export default function Rounds() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Function to handle button click and navigate to the Add Rounds page
  const goToAddRounds = () => {
    history.push("/addRound");
  };
  // Get the rounds from the Redux store
  const rounds = useSelector((state) => state.rounds);
  const user = useSelector((state) => state.user);
  // console.log(user);
  // Dispatch the FETCH_ROUNDS action when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_ROUNDS" });
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch({ type: "FETCH_USER" });
  // }, []);

  // console.log(rounds);

  return (
    <div className="container">
      <h1>Rounds</h1>
      <h2>Handicap Index {user.user_handicap}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={goToAddRounds}
        className="addButton"
      >
        Add Round
      </Button>
      <div>
        {rounds.map((round) => (
          <RoundsItem key={round.id} round={round} />
        ))}
      </div>
    </div>
  );
}
