import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { CardActions } from "@mui/material";
import Swal from "sweetalert2";

import EditIcon from "@mui/icons-material/Edit";

export default function RoundsItem({ round }) {
  const dispatch = useDispatch();

  //states
  const [editingRoundId, setEditingRoundId] = useState(null);
  const [editingFront9Score, setEditingFront9Score] = useState("");
  const [editingBack9Score, setEditingBack9Score] = useState("");
  const [newDate, setNewDate] = useState("");

  // function to set state when user edits an input
  const handleEdit = (id) => {
    // console.log("Logging round id", round.id);
    setEditingRoundId(round.id);
    // Set the local states with the original data from the round
    setEditingFront9Score(round.front_9_score);
    setEditingBack9Score(round.back_9_score);
    setNewDate(formatDate(round.date));
  };

  //deletes round from DB, with a sweetAlert to confirm delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch({
          type: "DELETE_ROUND",
          payload: { roundId: editingRoundId },
        });
      }
    });
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
    <div className="roundsPage">
      <Card key={round.id} className="styledRoundCard">
        <CardContent className="roundCardContent">
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

              <CardActions>
                <Button
                  className="cancelEditButton"
                  onClick={handleCancelEdit}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  className="deleteRoundButton"
                  onClick={() => handleDelete(round.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  className="saveRoundButton"
                  onClick={() => saveChanges(round.id)}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </CardActions>
            </>
          ) : (
            // Display round data
            <>
              <div className="courseAndDateWrapper">
                <div className="courseNameWrapper">
                  <Typography variant="h5" className="courseNameRound">
                    Course: {round.course_name}
                  </Typography>
                </div>
                <div className="courseDateWrapper">
                  <Typography variant="h5" className="roundDate">
                    {formatDate(round.date)}
                  </Typography>
                </div>
              </div>
              <div className="scoresWrapper">
                <div className="leftScores">
                  <Typography variant="h5" className="roundScore">
                    Total Score: {round.front_9_score + round.back_9_score}
                  </Typography>
                  {round.front_9_score !== 0 && (
                    <Typography variant="h6" className="front_9_Score">
                      Front 9: {round.front_9_score}
                    </Typography>
                  )}
                  {round.back_9_score !== 0 && (
                    <Typography variant="h6" className="back_9_Score">
                      Back 9: {round.back_9_score}
                    </Typography>
                  )}
                </div>
                <div className="rightScores">
                  <Typography variant="h5" className="roundDifferential">
                    Differential: {round.score_differential}
                  </Typography>
                </div>
              </div>
              <CardActions>
                <Button
                  style={{
                    fontSize: "12px",
                    marginTop: "40px",
                  }}
                  className="editRoundButton"
                  onClick={() => handleEdit(round.id)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </CardActions>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
