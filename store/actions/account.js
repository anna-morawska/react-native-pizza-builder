import {
  SAVE_DELIVERY_ADDRESS,
  SAVE_USER_PHOTO,
  SAVE_USER_DATA_ON_SERVER,
  FETCH_USER_DATA,
  FETCH_USER_ORDERS
} from "./actionTypes";
import { handleError, apiRequestJSON } from "../../api/api";
import uuidv4 from "uuid/v4";

import { db } from "../../api/firebaseConfig";

export const saveDeliveryAddress = ({ deliveryAddress }) => {
  return {
    type: SAVE_DELIVERY_ADDRESS,
    deliveryAddress
  };
};

export const saveUserPhoto = ({ userImg }) => {
  return {
    type: SAVE_USER_PHOTO,
    userImg
  };
};

export const getUserData = () => async (dispatch, getState) => {
  try {
    const authToken = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await apiRequestJSON({
      tableName: `users`,
      authToken,
      userId
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      resultId = Object.keys(resData);
      const { deliveryAddress, userImg } = resData[resultId];

      dispatch({
        type: FETCH_USER_DATA,
        deliveryAddress,
        userImg
      });
    }
  } catch (error) {
    handleError(error.message, dispatch);
  }
};

export const fetchUserOrders = () => async (dispatch, getState) => {
  try {
    const authToken = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await apiRequestJSON({
      tableName: "orders",
      authToken,
      userId
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      const loadedOrders = Object.keys(resData).map(key => resData[key]);

      dispatch({
        type: FETCH_USER_ORDERS,
        userOrders: loadedOrders
      });
    }
  } catch (error) {
    handleError(error.message, dispatch);
  }
};

export const saveUserDataOnServer = () => async (dispatch, getState) => {
  try {
    const imgUri = getState().account.userImg;
    let imageUrl = null;

    if (imgUri) {
      const result = await fetch(imgUri);
      const blob = await result.blob();
      const imageName = uuidv4();

      const ref = db.ref().child(`images/${imageName}`);
      await ref.put(blob);
      imageUrl = await ref.getDownloadURL();
    }

    const authToken = getState().auth.token;
    const userId = getState().auth.userId;
    const deliveryAddress = getState().account.deliveryAddress;

    const body = {
      userImg: imageUrl,
      deliveryAddress
    };

    const response = await apiRequestJSON({
      method: "POST",
      tableName: `users`,
      body,
      authToken,
      userId
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      dispatch({
        type: SAVE_USER_DATA_ON_SERVER,
        userImg: imageUrl,
        deliveryAddress
      });
    }
  } catch (error) {
    console.log("asdasdadasd");
    handleError(error.message, dispatch);
  }
};
