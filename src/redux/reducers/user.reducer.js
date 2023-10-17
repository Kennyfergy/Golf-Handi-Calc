const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "UNSET_USER":
      return {};
    case "SET_USER_HANDICAP":
      return { ...state, user_handicap: action.payload.user_handicap };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
