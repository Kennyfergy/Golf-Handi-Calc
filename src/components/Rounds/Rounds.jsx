import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./Rounds.css";
import Button from "@mui/material/Button";
import RoundsItem from "../RoundsItem/RoundsItem";

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

  // Dispatch the FETCH_ROUNDS action when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_ROUNDS" });
  }, [dispatch]);

  console.log(rounds);

  return (
    <div className="container">
      <h1>Rounds</h1>
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
