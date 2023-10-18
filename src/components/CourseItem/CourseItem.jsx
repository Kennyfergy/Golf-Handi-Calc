import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./CourseItem.css";

export default function CourseItem({ course }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  user.is_male ? console.log("male") : console.log("female");

  //declaring states
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingCourseName, setEditingCourseName] = useState("");
  const [editingLocation, setEditingLocation] = useState("");
  const [menBack9, setMenBack9] = useState("");
  const [menFront9, setMenFront9] = useState("");
  const [menCourseRating, setMenCourseRating] = useState("");
  const [menCourseSlope, setMenCourseSlope] = useState("");

  const [womenBack9, setWomenBack9] = useState("");
  const [womenFront9, setWomenFront9] = useState("");
  const [womenCourseRating, setWomenCourseRating] = useState("");
  const [womenCourseSlope, setWomenCourseSlope] = useState("");

  // function to set state when user edits inputs
  const handleEdit = (id) => {
    console.log("Logging course id", id);
    setEditingCourseId(id);
    // Set the local states with the original data from the course
    setEditingCourseName(course.course_name);
    setEditingLocation(course.course_location);
    setMenBack9(course.men_back_9_par);
    setMenFront9(course.men_front_9_par);
    setMenCourseRating(course.men_course_rating);
    setMenCourseSlope(course.men_course_slope);

    setWomenBack9(course.women_back_9_par);
    setWomenFront9(course.women_front_9_par);
    setWomenCourseRating(course.women_course_rating);
    setWomenCourseSlope(course.women_course_slope);
  };
  //deletes course from DB
  const handleDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (userConfirmed) {
      alert("Successfully Deleted Course");
      dispatch({
        type: "DELETE_COURSE",
        payload: { courseId: editingCourseId },
      });
    } else {
      console.log("Delete cancelled");
    }
  };

  //lets user cancel the edit mode
  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setEditingCourseName("");
    setEditingLocation("");
    setMenBack9("");
    setMenFront9("");
    setMenCourseRating("");
    setMenCourseSlope("");

    setWomenBack9("");
    setWomenFront9("");
    setWomenCourseRating("");
    setWomenCourseSlope("");
  };

  // submits the edit changes
  const saveChanges = () => {
    const updatedCourseData = {
      course_name: editingCourseName,
      course_location: editingLocation,
      men_back_9_par: menBack9,
      men_front_9_par: menFront9,
      men_course_rating: menCourseRating,
      men_course_slope: menCourseSlope,

      women_back_9_par: womenBack9,
      women_front_9_par: womenFront9,
      women_course_rating: womenCourseRating,
      women_course_slope: womenCourseSlope,
    };
    console.log("logging updatedCourseData", updatedCourseData);
    // Dispatch update action
    dispatch({
      type: "UPDATE_COURSE",
      payload: { courseId: editingCourseId, updatedCourseData },
    });

    // Exit edit mode
    setEditingCourseId(null);

    //clearing states
    setEditingCourseName("");
    setEditingLocation("");
    setMenBack9("");
    setMenFront9("");
    setMenCourseRating("");
    setMenCourseSlope("");

    setWomenBack9("");
    setWomenFront9("");
    setWomenCourseRating("");
    setWomenCourseSlope("");
  };
  console.log(course);
  console.log("course name", course.course_name);
  return (
    <div>
      <Card key={course.id} className="styledCard">
        <div className="inputGroup">
          <CardContent className="cardContent">
            {editingCourseId === course.id ? (
              // Render input fields for editing

              <>
                <>Course Name</>
                <input
                  type="text"
                  value={editingCourseName}
                  onChange={(event) => setEditingCourseName(event.target.value)}
                />
                <>Location</>
                <input
                  type="text"
                  value={editingLocation}
                  onChange={(event) => setEditingLocation(event.target.value)}
                />
                {user.is_male ? (
                  <>
                    <>Mens Back 9 Par</>
                    <input
                      type="text"
                      value={menBack9}
                      onChange={(event) => setMenBack9(event.target.value)}
                    />
                    <>Mens Front 9 Par</>
                    <input
                      type="text"
                      value={menFront9}
                      onChange={(event) => setMenFront9(event.target.value)}
                    />
                    <>Mens Course Rating</>
                    <input
                      type="text"
                      value={menCourseRating}
                      onChange={(event) =>
                        setMenCourseRating(event.target.value)
                      }
                    />
                    <>Mens Course Slope</>
                    <input
                      type="text"
                      value={menCourseSlope}
                      onChange={(event) =>
                        setMenCourseSlope(event.target.value)
                      }
                    />
                  </>
                ) : (
                  <>
                    <>Women's Back 9 Par</>
                    <input
                      type="text"
                      value={womenBack9}
                      onChange={(event) => setWomenBack9(event.target.value)}
                    />
                    <>Women's Front 9 Par</>
                    <input
                      type="text"
                      value={womenFront9}
                      onChange={(event) => setWomenFront9(event.target.value)}
                    />
                    <>Women's Course Rating</>
                    <input
                      type="text"
                      value={womenCourseRating}
                      onChange={(event) =>
                        setWomenCourseRating(event.target.value)
                      }
                    />
                    <>Women's Course Slope</>
                    <input
                      type="text"
                      value={womenCourseSlope}
                      onChange={(event) =>
                        setWomenCourseSlope(event.target.value)
                      }
                    />
                  </>
                )}
                <Button onClick={() => handleDelete(course.id)}>Delete</Button>
                <Button onClick={() => saveChanges(course.id)}>Save</Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>
              </>
            ) : (
              // Display course data
              <>
                <Button onClick={() => handleEdit(course.id)}>Edit</Button>

                <Typography variant="h5" className="courseName">
                  Course: {course.course_name}
                </Typography>
                <Typography variant="h5" className="courseName">
                  Location: {course.course_location}
                </Typography>

                <Typography variant="h5" className="courseName">
                  Par:{" "}
                  {user.is_male
                    ? course.men_back_9_par + course.men_front_9_par
                    : course.women_back_9_par + course.women_back_9_par}
                </Typography>
                <Typography variant="h5" className="courseName">
                  Course Rating:{" "}
                  {user.is_male
                    ? course.men_course_rating
                    : course.women_course_rating}
                </Typography>
                <Typography variant="h5" className="courseName">
                  Slope:{" "}
                  {user.is_male
                    ? course.men_course_slope
                    : course.women_course_slope}
                </Typography>
              </>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
//data available with
// course_location: "123 Golf Lane, Golftown";
// course_name: "Sample Golf Course";
// id: 3;
// men_back_9_par: 36; done
// men_course_rating: "70"; done
// men_course_slope: 130; done
// men_front_9_par: 35; done
// user_id: 9;
// women_back_9_par: 37;
// women_course_rating: "72.5";
// women_course_slope: 134;
// women_front_9_par: 36;
