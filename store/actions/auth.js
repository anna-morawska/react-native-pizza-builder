import { SING_UP, SING_IN, SING_OUT, AUTHENTICATE } from "./actionTypes";
import { SIGN_UP_ENDPOINT, SIGN_IN_ENDPOINT } from "../../env";
import { apiRequestJSON, handleError, saveDataToStorage } from "../../api/api";

export const authenticate = ({ userId, token }) => {
  return {
    type: AUTHENTICATE,
    userId,
    token
  };
};

export const signOut = () => {
  return {
    type: SING_OUT
  };
};

export const singUp = ({ email, password, redirect }) => async dispatch => {
  try {
    const response = await apiRequestJSON({
      method: "POST",
      url: SIGN_UP_ENDPOINT,
      body: {
        email,
        password,
        returnSecureToken: true
      }
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToStorage({
        key: "userData",
        value: {
          token: resData.idToken,
          userId: resData.localId,
          expirationDate: expirationDate.toISOString()
        }
      });

      dispatch({
        type: SING_UP,
        token: resData.idToken,
        userId: resData.localId
      });

      redirect();
    }
  } catch (error) {
    handleError(error.message, dispatch);
  }
};

export const signIn = ({ email, password, redirect }) => async dispatch => {
  try {
    const response = await apiRequestJSON({
      method: "POST",
      url: SIGN_IN_ENDPOINT,
      body: {
        email,
        password,
        returnSecureToken: true
      }
    });

    const resData = await response.json();

    if (resData.error) {
      handleError(resData.error.message, dispatch);
    } else {
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToStorage({
        key: "userData",
        value: {
          token: resData.idToken,
          userId: resData.localId,
          expirationDate: expirationDate.toISOString()
        }
      });

      dispatch({
        type: SING_IN,
        token: resData.idToken,
        userId: resData.localId
      });

      redirect();
    }
  } catch (error) {
    handleError(error.message, dispatch);
  }
};
