import roundsReducer from "../rounds.reducer";

describe("Testing the roundsReducer", () => {
  // Test 1: Initial state
  test("Initial state should be an empty array", () => {
    let initialState = [];
    let action = {};
    expect(roundsReducer(undefined, action)).toEqual(initialState);
  });

  // Test 2: SET_ROUNDS action
  test("SET_ROUNDS action sets state to payload", () => {
    let action = {
      type: "SET_ROUNDS",
      payload: [
        { id: 1, name: "Round 1" },
        { id: 2, name: "Round 2" },
      ],
    };
    expect(roundsReducer([], action)).toEqual(action.payload);
  });

  // Test 3: Unhandled action type
  test("Unhandled action type returns current state", () => {
    let currentState = [{ id: 1, name: "Round 1" }];
    let action = {
      type: "UNKNOWN_ACTION",
      payload: [],
    };
    expect(roundsReducer(currentState, action)).toEqual(currentState);
  });
});
