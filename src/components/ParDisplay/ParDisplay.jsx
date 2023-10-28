import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function ParDisplay(props) {
  const dispatch = useDispatch();
  const course = useSelector((store) => store.courses);
  const user = useSelector((store) => store.user);

  const [front9Par, setFront9Par] = useState("");
  const [back9Par, setBack9Par] = useState("");

  useEffect(() => {
    const selectedCourseId = props.selectedCourseId;

    // Find the selected course from the courses array
    const selectedCourse = course.find((c) => c.id === selectedCourseId);
    if (selectedCourse) {
      if (user.is_male) {
        setFront9Par(selectedCourse.men_front_9_par);
        setBack9Par(selectedCourse.men_back_9_par);
      } else {
        setFront9Par(selectedCourse.women_front_9_par);
        setBack9Par(selectedCourse.women_back_9_par);
      }
    }
  }, [props.selectedCourseId, course, user]);

  console.log("logging the front and back parsss", front9Par, back9Par);
  console.log("logggggg course and user", course, user);

  console.log("PARDISPLAY");

  return (
    <div className="parDisplays">
      <p className="front9-par-display">Front 9 par: {front9Par}</p>
      <p className="back9-par-display">Back 9 par: {back9Par}</p>
    </div>
  );
}
