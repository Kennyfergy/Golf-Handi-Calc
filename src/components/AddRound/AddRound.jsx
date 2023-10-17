import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import "./AddRound.css";

export default function AddRound() {
  const history = useHistory();

  // State for checkboxes
  const [front9, setFront9] = useState(false);
  const [back9, setBack9] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [front9Score, setFront9Score] = useState("");
  const [back9Score, setBack9Score] = useState("");
  const [roundDate, setRoundDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    //added error messages for all input fields
    if (!front9 && !back9) {
      setErrorMessage("Please select either Front 9 or Back 9.");
      return;
    }

    if (front9 && !front9Score) {
      setErrorMessage("Please enter a score for Front 9.");
      return;
    }

    if (back9 && !back9Score) {
      setErrorMessage("Please enter a score for Back 9.");
      return;
    }

    if (!courseId) {
      setErrorMessage("Please select a course.");
      return;
    }

    if (!roundDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    // Prepare the data payload
    const roundData = {
      //user_id: 0, // TODO: Replace this with the actual user ID, never mind don't even need this
      date: roundDate,
      front_9_score: front9 ? front9Score : 0,
      back_9_score: back9 ? back9Score : 0,
      course_id: courseId,
    };

    // Call the API endpoint to add the round
    try {
      const response = await fetch("/api/rounds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //need to specify to server that json data is sent
        },
        body: JSON.stringify(roundData), //sending JSON to server
      });

      if (response.ok) {
        console.log("Round added successfully");
        history.push("/rounds");
      } else {
        console.error("Failed to add round");
      }
    } catch (error) {
      console.error("There was an error adding the round", error);
    }
    setErrorMessage("");
  }; // end handleSubmit

  return (
    <div className="add-round-container">
      <Button onClick={() => history.push("/rounds")}>Back to Rounds</Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <Typography variant="h4">Add Round</Typography>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              checked={front9}
              onChange={(e) => setFront9(e.target.checked)}
              color="primary"
            />
          }
          label="Front 9"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={back9}
              onChange={(e) => setBack9(e.target.checked)}
              color="primary"
            />
          }
          label="Back 9"
        />
      </FormControl>
      <Typography variant="h6">Select Course:</Typography>
      <Select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        label="Course"
        variant="outlined"
      >
        {/* This should be populated with courses from the database */}
        <MenuItem value={1}>Course 1</MenuItem>
        <MenuItem value={2}>Course 2</MenuItem>
        {/* ... */}
      </Select>
      <div className="score-inputs">
        <TextField
          label="Front 9 Score"
          variant="outlined"
          type="number"
          value={front9Score}
          onChange={(e) => setFront9Score(e.target.value)}
        />
        {back9 && (
          <TextField
            label="Back 9 Score"
            variant="outlined"
            type="number"
            value={back9Score}
            onChange={(e) => setBack9Score(e.target.value)}
          />
        )}
      </div>
      <TextField
        label="Date"
        variant="outlined"
        type="date"
        value={roundDate}
        onChange={(e) => setRoundDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
