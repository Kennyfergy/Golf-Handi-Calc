import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Fuse from "fuse.js";
import "./Courses.css";

import CourseItem from "../CourseItem/CourseItem";
import CourseSearch from "./CourseSearch";

export default function Courses() {
  const dispatch = useDispatch();
  const history = useHistory();

  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("logging courses and user", courses, user);

  // Fuse.js options
  const fuseOptions = {
    keys: ["course_name", "course_location"],
    threshold: 0.2,
  };
  const fuse = new Fuse(courses, fuseOptions);
  const filteredCourses = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : courses;

  useEffect(() => {
    dispatch({ type: "FETCH_COURSES" });
  }, [dispatch]);

  const goToAddCourses = () => {
    history.push("/addCourse");
  };

  console.log(courses);
  return (
    <div className="coursesContainer">
      <h1>Courses</h1>
      <h2>Handicap Index {user.user_handicap}</h2>
      <CourseSearch onSearchChange={setSearchQuery} />
      <Button
        variant="contained"
        color="primary"
        onClick={goToAddCourses}
        className="addCourseButton"
      >
        Add New Course
      </Button>

      <div>
        {filteredCourses.map((course) => (
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
