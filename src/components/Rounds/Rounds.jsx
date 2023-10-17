import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Rounds.css";

//need to update this page and somehow add the course name to the rounds displayed

export default function Rounds() {
  const dispatch = useDispatch();

  // Get the rounds from the Redux store
  const rounds = useSelector((state) => state.rounds);

  // Dispatch the FETCH_ROUNDS action when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_ROUNDS" });
  }, [dispatch]);

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
      <h1>Rounds</h1>
      {rounds.map((round) => (
        <Card key={round.id} className={styles.styledCard}>
          <CardContent className={styles.cardContent}>
            <Typography variant="h5" className={styles.score}>
              Score: {round.front_9_score + round.back_9_score}
            </Typography>
            <Typography variant="subtitle1" className={styles.date}>
              {formatDate(round.date)}
            </Typography>
            <Typography variant="subtitle2" className={styles.courseHandicap}>
              Course Handicap: {round.course_handicap}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
