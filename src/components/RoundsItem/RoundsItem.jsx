import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function RoundsItem({ round }) {
  const dispatch = useDispatch();
  // console.log(round);
  //states
  const [editingRoundId, setEditingRoundId] = useState(null);
  const [editingFront9Score, setEditingFront9Score] = useState("");
  const [editingBack9Score, setEditingBack9Score] = useState("");
  const [newDate, setNewDate] = useState("");
  // const [roundToEdit, setRoundToEdit] = useState("");

  // function to set state when user edits an input
  const handleEdit = (id) => {
    // console.log("Logging round id", round.id);
    setEditingRoundId(round.id);
    // Set the local states with the original data from the round
    setEditingFront9Score(round.front_9_score);
    setEditingBack9Score(round.back_9_score);
    setNewDate(round.date);
  };

  //deletes round from DB
  const handleDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this round?"
    );
    if (userConfirmed) {
      alert("Successfully Deleted Round");
      dispatch({
        type: "DELETE_ROUND",
        payload: { roundId: editingRoundId },
      });
    } else {
      console.log("Delete cancelled");
    }
  };

  //lets user cancel the edit mode
  const handleCancelEdit = () => {
    setEditingRoundId(null);
    setEditingFront9Score("");
    setEditingBack9Score("");
    setNewDate("");
  };

  // submits the edit changes
  const saveChanges = () => {
    const updatedRoundData = {
      front_9_score: editingFront9Score,
      back_9_score: editingBack9Score,
      date: newDate,
    };
    // console.log("logging updatedRoundData", updatedRoundData);
    // Dispatch update action
    dispatch({
      type: "UPDATE_ROUND",
      payload: { roundId: editingRoundId, updatedRoundData },
    });

    // Exit edit mode
    setEditingRoundId(null);

    //clearing states
    setEditingFront9Score("");
    setEditingBack9Score("");
    setNewDate("");
  };

  // Function to format date to "YYYY-MM-DD" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} ${monthName} ${year}`;
  };

  return (
    <div>
      <Card key={round.id} className="styledCard">
        <CardContent className="cardContent">
          {editingRoundId === round.id ? (
            // Render input fields for editing
            <>
              <>Front 9</>
              <input
                type="number"
                value={editingFront9Score}
                onChange={(event) => setEditingFront9Score(event.target.value)}
              />
              <>Back 9</>
              <input
                type="number"
                value={editingBack9Score}
                onChange={(event) => setEditingBack9Score(event.target.value)}
              />

              <>Date</>
              <input
                type="text"
                value={newDate}
                onChange={(event) => setNewDate(event.target.value)}
              />
              <Button onClick={() => handleDelete(round.id)}>Delete</Button>
              <Button onClick={() => saveChanges(round.id)}>Save</Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </>
          ) : (
            // Display round data
            <>
              <Button onClick={() => handleEdit(round.id)}>Edit</Button>

              {/* <Button onClick={() => setRoundToEdit(round.id)}>Edit</Button> */}
              <Typography variant="h5" className="score">
                Course: {round.course_name}
              </Typography>
              <Typography variant="h5" className="score">
                Score: {round.front_9_score + round.back_9_score}
              </Typography>
              <Typography variant="subtitle1" className="date">
                {formatDate(round.date)}
              </Typography>
              {/* <Typography variant="subtitle2" className="courseHandicap"> not a usable feature yet
                Course Handicap: {round.course_handicap} 
              </Typography> */}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}