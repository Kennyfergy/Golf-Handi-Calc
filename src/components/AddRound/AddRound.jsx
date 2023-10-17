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

  const handleSubmit = async () => {
    // Prepare the data payload
    const roundData = {
      user_id: 1, // TODO: Replace this with the actual user ID
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roundData),
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
  };

  return (
    <div className="add-round-container">
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
