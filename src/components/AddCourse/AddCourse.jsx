import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import "./AddCourse.css";

export default function AddCourse() {
  const history = useHistory();

  const user = useSelector((store) => store.user);

  // State for each input
  const [courseName, setCourseName] = useState("");
  const [courseLocation, setCourseLocation] = useState("");
  const [menCourseRating, setMenCourseRating] = useState("");
  const [menCourseSlope, setMenCourseSlope] = useState("");
  const [menFront9Par, setMenFront9Par] = useState("");
  const [menBack9Par, setMenBack9Par] = useState("");
  const userId = user.id;
  const [womenCourseRating, setWomenCourseRating] = useState("");
  const [womenCourseSlope, setWomenCourseSlope] = useState("");
  const [womenFront9Par, setWomenFront9Par] = useState("");
  const [womenBack9Par, setWomenBack9Par] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    //added error messages for all input fields

    if (!courseName) {
      setErrorMessage("Please enter a course name.");
      return;
    }
    if (!courseLocation) {
      setErrorMessage("Please enter course location.");
      return;
    }
    if (user.is_male) {
      if (!menCourseRating) {
        setErrorMessage("Please enter men course rating.");
        return;
      }
      if (!menCourseSlope) {
        setErrorMessage("Please enter men course slope.");
        return;
      }
      if (!menFront9Par) {
        setErrorMessage("Please enter men par for front 9.");
        return;
      }
      if (!menBack9Par) {
        setErrorMessage("Please enter men par for back 9, if 9 hole enter 0.");
        return;
      }
    } else {
      if (!womenCourseRating) {
        setErrorMessage("Please enter women course rating.");
        return;
      }
      if (!womenCourseSlope) {
        setErrorMessage("Please enter women course slope.");
        return;
      }
      if (!womenFront9Par) {
        setErrorMessage("Please enter women par for front 9.");
        return;
      }
      if (!womenBack9Par) {
        setErrorMessage(
          "Please enter women par for back 9, if 9 hole, enter 0."
        );
        return;
      }
    }
    // Prepare the data payload
    let courseData = {
      course_name: courseName,
      course_location: courseLocation,
      user_id: userId,
    };

    if (user.is_male) {
      courseData.men_course_rating = menCourseRating;
      courseData.men_course_slope = menCourseSlope;
      courseData.men_front_9_par = menFront9Par;
      courseData.men_back_9_par = menBack9Par;
    } else {
      courseData.women_course_rating = womenCourseRating;
      courseData.women_course_slope = womenCourseSlope;
      courseData.women_front_9_par = womenFront9Par;
      courseData.women_back_9_par = womenBack9Par;
    }

    // Call the API endpoint to add the round
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //need to specify to server that json data is sent
        },
        body: JSON.stringify(courseData), //sending JSON to server
      });

      if (response.ok) {
        console.log("Course added successfully");
        history.push("/courses");
      } else {
        console.error("Failed to add course");
      }
    } catch (error) {
      console.error("There was an error adding the course", error);
    }
    setErrorMessage("");
  }; // end handleSubmit
  return (
    <Paper id="courseForm" className="add-course-container" elevation={3}>
      <Typography variant="h4" align="center" gutterBottom>
        {user.is_admin && <>Please use admin page to</>} Add Course
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />

      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => history.push("/courses")}
        style={{ marginBottom: "20px" }}
      >
        ⬅ Back to Courses
      </Button>

      {errorMessage && (
        <Typography
          variant="body1"
          color="error"
          style={{ marginBottom: "20px" }}
        >
          {errorMessage}
        </Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Name"
            variant="outlined"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Location"
            variant="outlined"
            type="text"
            value={courseLocation}
            onChange={(e) => setCourseLocation(e.target.value)}
          />
        </Grid>
        {user.is_male ? (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Men's Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Rating"
                variant="outlined"
                type="number"
                value={menCourseRating}
                onChange={(e) => setMenCourseRating(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Slope"
                variant="outlined"
                type="number"
                value={menCourseSlope}
                onChange={(e) => setMenCourseSlope(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Front 9 Par"
                variant="outlined"
                type="number"
                value={menFront9Par}
                onChange={(e) => setMenFront9Par(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Back 9 Par"
                variant="outlined"
                type="number"
                value={menBack9Par}
                onChange={(e) => setMenBack9Par(e.target.value)}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Women's Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Rating"
                variant="outlined"
                type="number"
                value={womenCourseRating}
                onChange={(e) => setWomenCourseRating(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Slope"
                variant="outlined"
                type="number"
                value={womenCourseSlope}
                onChange={(e) => setWomenCourseSlope(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Front 9 Par"
                variant="outlined"
                type="number"
                value={womenFront9Par}
                onChange={(e) => setWomenFront9Par(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Back 9 Par"
                variant="outlined"
                type="number"
                value={womenBack9Par}
                onChange={(e) => setWomenBack9Par(e.target.value)}
              />
            </Grid>
          </>
        )}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            className="submit-btn"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
} // end addCourse

//data needed for courses table
// user_id,
//   course_name,
//   course_location,
//   men_course_rating,
//   men_course_slope,
//   men_front_9_par,
//   men_back_9_par,
//   women_course_rating,
//   women_course_slope,
//   women_front_9_par,
//   women_back_9_par;
