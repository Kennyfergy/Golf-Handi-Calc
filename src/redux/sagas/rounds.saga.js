import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Worker Saga: fetch rounds from the backend
function* fetchRounds() {
  try {
    const response = yield axios.get("/api/rounds/"); //is it api/rounds? need to check
    yield put({ type: "SET_ROUNDS", payload: response.data });
  } catch (error) {
    console.error("Error fetching rounds:", error);
  }
}
function* updateRound(action) {
  try {
    const response = yield axios.put(
      `/api/rounds/${action.payload.roundId}`,
      action.payload.updatedRoundData
    );
    console.log(response);
    yield put({ type: "FETCH_ROUNDS" }); // Refresh rounds data
  } catch (error) {
    console.error("Error updating round", error);
  }
}
// Watcher Saga: watch for actions of type 'FETCH_ROUNDS'
function* roundsSaga() {
  yield takeEvery("FETCH_ROUNDS", fetchRounds);
  yield takeEvery("UPDATE_ROUND", updateRound);
}

export default roundsSaga;
