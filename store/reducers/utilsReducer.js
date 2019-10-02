import {
  SET_ERROR,
  CLEAR_ERROR,
  LOADING_START,
  LOADING_FINISH,
  RESET_ORDER
} from "../actions/actionTypes";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING_START:
      return true;

    case LOADING_FINISH:
    case RESET_ORDER:
      return false;

    default:
      return state;
  }
};

const errorReducer = (
  state = {
    title: "",
    message: ""
  },
  action
) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        title: action.title,
        message: action.message
      };

    case CLEAR_ERROR:
      return {
        title: "",
        message: ""
      };
    default:
      return state;
  }
};

export { loadingReducer, errorReducer };
