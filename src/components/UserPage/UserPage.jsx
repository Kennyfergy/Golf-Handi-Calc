import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";
import { Box, Typography } from "@mui/material";

function UserPage() {
  const dispatch = useDispatch();

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
      {/* <Typography variant="body1" gutterBottom>
        Your ID is: {user.id}
      </Typography> */}

      <Box className="infoBox">
        <Typography variant="h6" gutterBottom>
          Handicap Index:
        </Typography>
        <Typography variant="h4">{user.user_handicap}</Typography>
      </Box>

      <Box className="infoBox">
        <Typography variant="h6" gutterBottom>
          Rounds Played:
        </Typography>
        <Typography variant="h4">{round.length}</Typography>
      </Box>

      <Box className="infoBox">
        <Typography variant="h6" gutterBottom>
          Courses Played:
        </Typography>
        <Typography variant="h4">{numberOfUniqueCoursesPlayed}</Typography>
      </Box>
    </div>
  );
}

export default UserPage;
