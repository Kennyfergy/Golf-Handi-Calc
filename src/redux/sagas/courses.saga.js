import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchCourses(action) {
  try {
    const response = yield axios.get(`/api/courses/${action.payload}`);
    yield put({ type: "SET_COURSES", payload: response.data });
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

function* coursesSaga() {
  yield takeEvery("FETCH_COURSES", fetchCourses);
}

export default coursesSaga;
