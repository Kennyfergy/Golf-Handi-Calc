import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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
// import "./AddCourse.css";

export default function AddCourse() {
  const history = useHistory();

  const user = useSelector((store) => store.user);
  console.log("who the fuck am I ?", user);

  // State for checkboxes
  //   const [front9, setFront9] = useState(false);
  //   const [back9, setBack9] = useState(false);
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
      setErrorMessage("Please enter men par for back 9.");
      return;
    }

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
      setErrorMessage("Please enter women par for back 9.");
      return;
    }

    // Prepare the data payload
    const courseData = {
      //user_id: 0, // TODO: Replace this with the actual user ID, never mind don't even need this
      course_name: courseName,
      course_location: courseLocation,
      men_course_rating: menCourseRating,
      men_course_slope: menCourseSlope,
      men_front_9_par: menFront9Par,
      men_back_9_par: menBack9Par,
      women_course_rating: womenCourseRating,
      women_course_slope: womenCourseSlope,
      women_front_9_par: womenFront9Par,
      women_back_9_par: womenBack9Par,
      user_id: userId,
    };
    console.log("course dataaa", courseData);
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
    <div className="add-course-container">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push("/courses")}
      >
        Back to Courses
      </Button>
      {errorMessage && (
        <Typography variant="h6" className="errorMessage">
          {errorMessage}
        </Typography>
      )}

      <Typography variant="h4">Add Course</Typography>

      <TextField
        label="Course Name"
        variant="outlined"
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      <TextField
        label="Course Location"
        variant="outlined"
        type="text"
        value={courseLocation}
        onChange={(e) => setCourseLocation(e.target.value)}
      />
      <TextField
        label="Men Course Rating"
        variant="outlined"
        type="number"
        value={menCourseRating}
        onChange={(e) => setMenCourseRating(e.target.value)}
      />
      <TextField
        label="Men Course Slope"
        variant="outlined"
        type="number"
        value={menCourseSlope}
        onChange={(e) => setMenCourseSlope(e.target.value)}
      />
      <TextField
        label="Men Front 9 Par"
        variant="outlined"
        type="number"
        value={menFront9Par}
        onChange={(e) => setMenFront9Par(e.target.value)}
      />
      <TextField
        label="Men Back 9 Par"
        variant="outlined"
        type="number"
        value={menBack9Par}
        onChange={(e) => setMenBack9Par(e.target.value)}
      />

      <TextField
        label="Women Course Rating"
        variant="outlined"
        type="number"
        value={womenCourseRating}
        onChange={(e) => setWomenCourseRating(e.target.value)}
      />
      <TextField
        label="Women Course Slope"
        variant="outlined"
        type="number"
        value={womenCourseSlope}
        onChange={(e) => setWomenCourseSlope(e.target.value)}
      />
      <TextField
        label="Women Front 9 Par"
        variant="outlined"
        type="number"
        value={womenFront9Par}
        onChange={(e) => setWomenFront9Par(e.target.value)}
      />
      <TextField
        label="Women Back 9 Par"
        variant="outlined"
        type="number"
        value={womenBack9Par}
        onChange={(e) => setWomenBack9Par(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

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
