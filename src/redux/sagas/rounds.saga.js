import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Worker Saga: fetch rounds from the backend
function* fetchRounds() {
  try {
    const response = yield axios.get("/api/rounds/");
    console.log(response.data);
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
    // console.log(response);
    yield put({ type: "FETCH_ROUNDS" }); // Refresh rounds data
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.error("Error updating round", error);
  }
}

function* addRound(action) {
  try {
    const response = yield axios.post("/api/rounds", action.payload);

    yield put({ type: "FETCH_ROUNDS" }); //refresh rounds data
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("error adding round", error);
  }
}

function* deleteRound(action) {
  try {
    yield axios.delete(`/api/rounds/${action.payload.roundId}`);
    yield put({ type: "FETCH_ROUNDS" });
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("error with DELETE saga request", error);
  }
}

// Watcher Saga: watch for actions of type 'FETCH_ROUNDS'
function* roundsSaga() {
  yield takeEvery("FETCH_ROUNDS", fetchRounds);
  yield takeEvery("UPDATE_ROUND", updateRound);
  yield takeEvery("DELETE_ROUND", deleteRound);
  yield takeEvery("ADD_ROUND", addRound);
}

export default roundsSaga;
