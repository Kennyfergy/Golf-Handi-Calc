import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({ type: "FETCH_ROUNDS" });
  }, []);
  const round = useSelector((store) => store.rounds);
  console.log(round);

  // Extract a list of course IDs from the rounds data
  const courseIdsPlayed = round.map((round) => round.course_id);
  // Convert this list into a set to get unique course IDs
  const uniqueCoursesPlayed = new Set(courseIdsPlayed);
  // The size of this set is the number of unique courses played
  const numberOfUniqueCoursesPlayed = uniqueCoursesPlayed.size;

  return (
    <div className="userPageBackground">
      <div className="welcome_header">
        <Typography variant="h2" gutterBottom>
          Welcome {user.username}
        </Typography>
      </div>
      <div className="cardsContainer">
        <Box className="infoBox">
          <Typography variant="h4" gutterBottom>
            Handicap Index:
          </Typography>
          <Typography variant="h4">{user.user_handicap}</Typography>
        </Box>

        <Box className="infoBox">
          <Typography variant="h4" gutterBottom>
            Rounds Played:
          </Typography>
          <Typography variant="h4">{round.length}</Typography>
        </Box>

        <Box className="infoBox">
          <Typography variant="h4" gutterBottom>
            Courses Played:
          </Typography>

          <Typography variant="h4">{numberOfUniqueCoursesPlayed}</Typography>
        </Box>
        <div className="quickAddBox">
          <Button
            className="quickAddButton"
            onClick={() => history.push("/addRound")}
          >
            <AddIcon style={{ marginRight: "8px", fontSize: "30px" }} />
            Add Round
          </Button>
          <Button
            className="quickAddButton"
            onClick={() => history.push("/addCourse")}
          >
            <AddIcon style={{ marginRight: "8px", fontSize: "30px" }} />
            Add Course
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
