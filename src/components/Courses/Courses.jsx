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

  //console.log("logging courses and user", courses, user);

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

  return (
    <div className="coursesContainer">
      <h1>Courses</h1>
      <h2 className="hIHeader">Handicap Index {user.user_handicap}</h2>
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
