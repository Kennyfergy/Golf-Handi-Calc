import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  FormControl,
} from "@mui/material";
import "./AddRound.css";

export default function AddRound() {
  const history = useHistory();

  // State for checkboxes
  const [front9, setFront9] = useState(false);
  const [back9, setBack9] = useState(false);

  const handleSubmit = () => {
    history.push("/rounds");
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
      <TextField label="Course" variant="outlined" />
      <div className="score-inputs">
        <TextField label="Front 9 Score" variant="outlined" type="number" />
        {back9 && (
          <TextField label="Back 9 Score" variant="outlined" type="number" />
        )}
      </div>
      <TextField
        label="Date"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
