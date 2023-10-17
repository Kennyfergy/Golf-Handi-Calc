// Initial state for the rounds reducer
const initialState = [];

// Reducer for handling actions related to rounds
const roundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROUNDS":
      return action.payload;
    default:
      return state;
  }
};

export default roundsReducer;

// return state.map((round) =>
//         round.id === action.payload.id ? action.payload : round
//       );
