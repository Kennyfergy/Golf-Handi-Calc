import coursesReducer from "../courses.reducer";

describe("Testing the coursesReducer", () => {
  //testing initial state
  test("Initial state should be empty array", () => {
    let initialState = [];
    let action = {};
    expect(coursesReducer(undefined, action)).toEqual(initialState);
  });
  // Test 2: SET_COURSES action
  test("SET_COURSES action sets state to payload", () => {
    let action = {
      type: "SET_COURSES",
      payload: [
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
      ],
    };
    expect(coursesReducer([], action)).toEqual(action.payload);
  });

  // Test 3: Unhandled action type
  test("Unhandled action type returns current state", () => {
    let currentState = [{ id: 1, name: "Course 1" }];
    let action = {
      type: "UNKNOWN_ACTION",
      payload: [],
    };
    expect(coursesReducer(currentState, action)).toEqual(currentState);
  });
});
