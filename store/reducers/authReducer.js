import {
  SING_IN,
  SING_UP,
  SING_OUT,
  AUTHENTICATE
} from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SING_IN:
    case SING_UP:
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };

    default:
      return state;
  }
};

export { authReducer };
