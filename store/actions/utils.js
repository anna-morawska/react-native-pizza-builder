import {
  SET_ERROR,
  CLEAR_ERROR,
  LOADING_START,
  LOADING_FINISH
} from "./actionTypes";

export const setError = error => {
  return {
    type: SET_ERROR,
    message: error
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};

export const loadingStart = () => {
  return {
    type: LOADING_START
  };
};

export const loadingFinish = () => {
  return {
    type: LOADING_FINISH
  };
};
