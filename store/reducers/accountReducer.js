import {
  SAVE_DELIVERY_ADDRESS,
  SAVE_USER_PHOTO,
  SAVE_USER_DATA_ON_SERVER,
  FETCH_USER_DATA,
  FETCH_USER_ORDERS
} from "../actions/actionTypes";

const initialState = {
  deliveryAddress: {
    latitude: null,
    longitude: null
  },
  userImg: null,
  userEmail: null,
  userOrders: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DELIVERY_ADDRESS:
      if (typeof action.deliveryAddress === "object") {
        return {
          ...state,
          deliveryAddress: {
            latitude: action.deliveryAddress.latitude,
            longitude: action.deliveryAddress.longitude
          }
        };
      } else {
        return state;
      }

    case SAVE_USER_PHOTO:
      return {
        ...state,
        userImg: action.userImg
      };

    case FETCH_USER_ORDERS:
      return {
        ...state,
        userOrders: action.userOrders
      };

    case SAVE_USER_DATA_ON_SERVER:
    case FETCH_USER_DATA:
      return {
        ...state,
        userImg: action.userImg,
        deliveryAddress: action.deliveryAddress
      };

    default:
      return state;
  }
};

export { accountReducer };
