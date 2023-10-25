import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RoundSearch from "./RoundSearch";
import Fuse from "fuse.js";

import "./Rounds.css";

import Button from "@mui/material/Button";
import RoundsItem from "../RoundsItem/RoundsItem";

export default function Rounds() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  // Fuse.js options
  const fuseOptions = {
    keys: ["course_name", "date"],
    threshold: 0.2,
  };

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
  }, []);

  // Using Fuse.js to search the rounds
  const fuse = new Fuse(rounds, fuseOptions);
  const filteredRounds = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : rounds;
  console.log(user.user_handicap);
  return (
    <div className="roundContainer">
      <h1>Rounds</h1>
      <h2 className="hIHeader2">Handicap Index {user.user_handicap}</h2>

      <RoundSearch onSearchChange={setSearchQuery} />

      <Button
        variant="contained"
        color="primary"
        onClick={goToAddRounds}
        className="addRoundButton"
      >
        Add Round
      </Button>
      <div>
        {filteredRounds.map((round) => (
          <RoundsItem key={round.id} round={round} />
        ))}
      </div>
    </div>
  );
}
