import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* fetchHandicapSaga(action) {
  try {
    const response = yield axios.get(`/api/handicap/${action.payload.userId}`);

    yield put({ type: "SET_HANDICAP", payload: response.data.handicap });
  } catch (error) {
    console.log(error);
    alert("Unable to get handicap from server");
  }
}
function* handicapSaga() {
  yield takeLatest("FETCH_HANDICAP", fetchHandicapSaga);
}

export default handicapSaga;
