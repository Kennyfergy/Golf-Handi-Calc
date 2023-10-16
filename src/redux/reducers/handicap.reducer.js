const handicapReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_HANDICAP":
      return action.payload;
    default:
      return state;
  }
};

export default handicapReducer;
