import React, { useEffect, useState } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";

import SendIcon from "@mui/icons-material/Send";
import "./AddRound.css";
import { useDispatch, useSelector } from "react-redux";

export default function AddRound() {
  const dispatch = useDispatch();
  const history = useHistory();

  const course = useSelector((store) => store.courses);

  useEffect(() => {
    dispatch({ type: "FETCH_COURSES" });
  }, [dispatch]);

  useEffect(() => {
    if (course && course.length > 0) {
      setCourseId(course[0].id);
    }
  }, [course]);

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
      date: roundDate,
      front_9_score: front9 ? front9Score : 0,
      back_9_score: back9 ? back9Score : 0,
      course_id: courseId,
    };
    dispatch({ type: "ADD_ROUND", payload: roundData });
    Swal.fire("Success!", "Round added", "success");
    history.push("/rounds");

    setErrorMessage("");
  }; // end handleSubmit
  return (
    <div className="add-round-container">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push("/rounds")}
        startIcon={<ArrowBackIcon />}
      >
        Back to Rounds
      </Button>
      {errorMessage && (
        <Typography variant="h6" className="errorMessage">
          {errorMessage}
        </Typography>
      )}

      <Typography variant="h4" style={{ marginTop: "20px" }}>
        Add Round
      </Typography>
      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
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
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Select Course:
      </Typography>
      <Select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        label="Course"
        variant="outlined"
      >
        {course.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.course_name}
          </MenuItem>
        ))}
      </Select>
      <div className="round-inputs">
        {front9 && (
          <TextField
            label="Front 9 Score"
            variant="outlined"
            type="number"
            value={front9Score}
            onChange={(e) => setFront9Score(e.target.value)}
          />
        )}

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
        className="date-input-field"
      />

      <Button
        style={{
          backgroundColor: "#1a481b",
          color: "white",
          marginTop: "20px",
          "&:hover": {
            backgroundColor: "#173a18",
          },
        }}
        className="submitRoundButton"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        startIcon={<SendIcon />}
      >
        Submit
      </Button>
    </div>
  );
}
