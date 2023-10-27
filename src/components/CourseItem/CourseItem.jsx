import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";

import { calculateCourseHandicap } from "./CourseFunctions";

export default function CourseItem({ course }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // user.is_male ? console.log("male") : console.log("female");

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

  // Calculate course handicap using the user's handicap and course slope, for 9 or 18 hole
  const slopeRating = user.is_male
    ? course.men_course_slope
    : course.women_course_slope;
  const courseHandicap = calculateCourseHandicap(
    user.user_handicap,
    slopeRating
  );

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
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Successfully Deleted Course", "success");
      dispatch({
        type: "DELETE_COURSE",
        payload: { courseId: editingCourseId },
      });
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

    // Dispatch update action
    dispatch({
      type: "UPDATE_COURSE",
      payload: { courseId: editingCourseId, updatedCourseData },
    });

    // Show SweetAlert2 notification
    Swal.fire({
      title: "Success!",
      text: "Your changes have been saved.",
      icon: "success",
      confirmButtonColor: "#3085d6",
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
  // console.log(course);
  // console.log("course name", course.course_name);
  return (
    <div className="coursePage">
      <Card key={course.id} className="styledCourseCard">
        <CardContent className="courseCardContent">
          <div className="courseNameWrapper">
            {editingCourseId === course.id ? (
              <TableRow>
                <TableCell style={{ fontSize: "26px" }}>Course Name</TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={editingCourseName}
                    onChange={(event) =>
                      setEditingCourseName(event.target.value)
                    }
                    style={{ fontSize: "20px" }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <Typography
                variant="h6"
                className="courseName"
                style={{ fontSize: "34px" }}
              >
                {course.course_name}
              </Typography>
            )}
          </div>
          {editingCourseId === course.id ? (
            <>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: "26px" }}>Location</TableCell>
                    <TableCell style={{ fontSize: "26px" }}>
                      <input
                        type="text"
                        value={editingLocation}
                        onChange={(event) =>
                          setEditingLocation(event.target.value)
                        }
                        style={{ fontSize: "20px" }}
                      />
                    </TableCell>
                  </TableRow>

                  {user.is_male ? (
                    <>
                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Men's Front 9 Par
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={menFront9}
                            onChange={(event) =>
                              setMenFront9(event.target.value)
                            }
                            style={{ fontSize: "20px" }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Men's Back 9 Par
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={menBack9}
                            onChange={(event) =>
                              setMenBack9(event.target.value)
                            }
                            style={{ fontSize: "20px" }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Men's Course Rating
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={menCourseRating}
                            onChange={(event) =>
                              setMenCourseRating(event.target.value)
                            }
                            style={{ fontSize: "20px" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Men's Course Slope
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={menCourseSlope}
                            onChange={(event) =>
                              setMenCourseSlope(event.target.value)
                            }
                            style={{ fontSize: "20px" }}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Women's Front 9 Par
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={womenFront9}
                            onChange={(event) =>
                              setWomenFront9(event.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Women's Back 9 Par
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={womenBack9}
                            onChange={(event) =>
                              setWomenBack9(event.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Women's Course Rating
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={womenCourseRating}
                            onChange={(event) =>
                              setWomenCourseRating(event.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontSize: "26px" }}>
                          Women's Course Slope
                        </TableCell>
                        <TableCell style={{ fontSize: "26px" }}>
                          <input
                            type="text"
                            value={womenCourseSlope}
                            onChange={(event) =>
                              setWomenCourseSlope(event.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
              <div className="editButtons">
                <Button
                  className="cancelEditButton"
                  onClick={handleCancelEdit}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  className="deleteCourseButton"
                  onClick={() => handleDelete(course.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  className="saveCourseButton"
                  onClick={() => saveChanges(course.id)}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
            </>
          ) : (
            <div className="cardWrapper">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: "26px" }}>Location</TableCell>
                    <TableCell style={{ fontSize: "26px" }}>
                      {course.course_location}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "26px" }}>Par</TableCell>
                    <TableCell style={{ fontSize: "26px" }}>
                      {user.is_male
                        ? course.men_back_9_par + course.men_front_9_par
                        : course.women_back_9_par + course.women_front_9_par}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "26px" }}>
                      Course Rating
                    </TableCell>
                    <TableCell style={{ fontSize: "26px" }}>
                      {user.is_male
                        ? course.men_course_rating
                        : course.women_course_rating}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "26px" }}>Slope</TableCell>
                    <TableCell style={{ fontSize: "26px" }}>
                      {user.is_male
                        ? course.men_course_slope
                        : course.women_course_slope}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "26px" }}>
                      {user.username}'s Course Handicap
                    </TableCell>
                    <TableCell style={{ fontSize: "26px" }}>
                      {courseHandicap}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="editAndAdmin">
                {(!course.is_admin_course || user.is_admin) && (
                  <Button
                    className="editCourseButton"
                    onClick={() => handleEdit(course.id)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                )}
                {course.is_admin_course ? <p></p> : <></>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
