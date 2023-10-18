import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Courses.css";

import CourseItem from "../CourseItem/CourseItem";

export default function Courses() {
  const dispatch = useDispatch();
  const history = useHistory();

  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: "FETCH_COURSES" });
  }, [dispatch]);

  const goToAddCourses = () => {
    history.push("/addCourse");
  };

  user.is_male ? console.log("male") : console.log("female");

  console.log(courses);
  return (
    <div className="container">
      <h1>Courses</h1>
      <h2>Handicap Index {user.user_handicap}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={goToAddCourses}
        className="addButton"
      >
        Add New Course
      </Button>
      <div>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
//data inside courses
// course_location: "123 Golf Lane, Golftown";
// course_name: "Sample Golf Course";
// id: 3;
// men_back_9_par: 36;
// men_course_rating: "70";
// men_course_slope: 130;
// men_front_9_par: 35;
// user_id: 9;
// women_back_9_par: 37;
// women_course_rating: "72.5";
// women_course_slope: 134;
// women_front_9_par: 36;
