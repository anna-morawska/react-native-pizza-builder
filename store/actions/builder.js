import {
  SET_PIZZA_SIZE,
  SET_PIZZA_CRUST,
  SET_PIZZA_INGREDIENTS,
  RESET_ORDER,
  FETCH_USER_ORDERS,
  SET_POLL_RESULTS
} from "./actionTypes";

import { apiRequestJSON, handleError } from "../../api/api";
import uuidv4 from "uuid/v4";

export const setPizzaSize = size => {
  return {
    type: SET_PIZZA_SIZE,
    size
  };
};

export const setPizzaCrust = crust => {
  return {
    type: SET_PIZZA_CRUST,
    crust
  };
};

export const setPizzaIngredients = ({ name, qty }) => {
  return {
    type: SET_PIZZA_INGREDIENTS,
    name,
    qty
  };
};

export const resetOrder = () => {
  return {
    type: RESET_ORDER
  };
};

export const saveOrder = (order, redirect) => async (dispatch, getState) => {
  try {
    const authToken = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await apiRequestJSON({
      method: "POST",
      tableName: "orders",
      body: {
        ...order,
        created: new Date().toLocaleDateString(),
        id: uuidv4()
      },
      authToken,
      userId
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      dispatch({
        type: RESET_ORDER,
        name: order
      });

      redirect();
    }
  } catch (error) {
    handleError(error.message, dispatch);
  }
};

export const getPollResults = () => async (dispatch, getState) => {
  try {
    const authToken = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await apiRequestJSON({
      method: "GET",
      tableName: "analytics",
      authToken
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      dispatch({
        type: SET_POLL_RESULTS,
        pollResults: resData
      });
    }
  } catch (error) {
    handleError(error.message, dispatch);
  }
};
