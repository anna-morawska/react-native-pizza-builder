import { THIN, SMALL } from "../../constants/constants";
import {
  SET_PIZZA_CRUST,
  SET_PIZZA_SIZE,
  SET_PIZZA_INGREDIENTS,
  RESET_ORDER
} from "../actions/actionTypes";

const initialState = {
  size: SMALL,
  crust: THIN,
  price: 20,
  toppings: {
    Cheese: 0,
    Jalapenos: 0,
    Mushroom: 0,
    Becon: 0,
    Olives: 0,
    Pineapple: 0,
    Ham: 0,
    Basil: 0
  }
};

const builderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PIZZA_SIZE:
      return {
        ...state,
        size: action.size
      };

    case SET_PIZZA_CRUST:
      return {
        ...state,
        crust: action.crust
      };

    case SET_PIZZA_INGREDIENTS:
      return {
        ...state,
        toppings: {
          ...state.toppings,
          [action.name]: action.qty
        }
      };

    case RESET_ORDER:
      return initialState;

    default:
      return state;
  }
};

export { builderReducer };
