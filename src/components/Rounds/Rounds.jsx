import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Rounds.css";
import Button from "@mui/material/Button";
import RoundsItem from "../RoundsItem/RoundsItem";

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

  // Dispatch the FETCH_ROUNDS action when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_ROUNDS" });
  }, [dispatch]);

  return (
    <div className="roundContainer">
      <h1>Rounds</h1>
      <h2>Handicap Index {user.user_handicap}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={goToAddRounds}
        className="addRoundButton"
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
