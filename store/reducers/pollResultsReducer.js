import { SET_POLL_RESULTS } from "../actions/actionTypes";

const initialState = {};

const pollResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLL_RESULTS:
      return action.pollResults;

    default:
      return state;
  }
};

export { pollResultsReducer };
