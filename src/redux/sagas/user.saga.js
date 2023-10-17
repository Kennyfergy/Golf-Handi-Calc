import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

// //function to grab a users handicap
// function* fetchUserHandicap(action) {
//   try {
//     const response = yield call(axios.get, `/user/${action.payload}`);
//     yield put({ type: "SET_USER_HANDICAP", payload: response.data });
//   } catch (error) {
//     console.error("Error fetching user handicap:", error);
//   }
// }

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  // yield takeLatest("FETCH_USER_HANDICAP", fetchUserHandicap);
}

export default userSaga;
