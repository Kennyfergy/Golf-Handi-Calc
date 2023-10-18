import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// ${action.payload} removed from axios.get
// Worker Saga: for courses from the backend
function* fetchCourses() {
  try {
    const response = yield axios.get("/api/courses/");
    yield put({ type: "SET_COURSES", payload: response.data });
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

function* updateCourse(action) {
  try {
    const response = yield axios.put(
      `/api/courses/${action.payload.courseId}`,
      action.payload.updatedCourseData
    );
    console.log(response);
    yield put({ type: "FETCH_COURSES" }); // Refresh courses data
  } catch (error) {
    console.error("Error updating courses", error);
  }
}

function* deleteCourse(action) {
  try {
    yield axios.delete(`/api/courses/${action.payload.courseId}`);
    yield put({ type: "FETCH_COURSES" });
  } catch (error) {
    console.log("error with DELETE COURSES saga request", error);
  }
}

function* coursesSaga() {
  yield takeEvery("FETCH_COURSES", fetchCourses);
  yield takeEvery("UPDATE_COURSE", updateCourse);
  yield takeEvery("DELETE_COURSE", deleteCourse);
}

export default coursesSaga;
