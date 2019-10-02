import { AsyncStorage } from "react-native";

import { API_URL } from "../env";
import { SET_ERROR } from "../store/actions/actionTypes";

export const apiRequestJSON = ({
  method = "GET",
  tableName,
  body,
  url,
  authToken,
  userId
}) => {
  const requestedUrl = url
    ? url
    : `${API_URL}/${tableName}${
        userId ? `/${userId}` : ""
      }.json?auth=${authToken}`;

  return fetch(requestedUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
};

export const handleError = (errorCode, dispatch) => {
  const error = translateErrorCode({ errorCode });

  dispatch({
    type: SET_ERROR,
    message: error.message,
    title: error.title
  });
};

export const saveDataToStorage = ({ key, value }) => {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

export const translateErrorCode = ({ errorCode }) => {
  switch (errorCode) {
    case "EMAIL_EXISTS":
      return {
        title: "Invalid e-mail",
        message: "The email address is already in use by another account."
      };

    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return {
        title: "Try again later",
        message:
          "We have blocked all requests from this device due to unusual activity. Try again later."
      };

    case "EMAIL_NOT_FOUND":
      return {
        title: "Email not found",
        message:
          "There is no user record corresponding to this identifier. The user may have been deleted."
      };

    case "INVALID_PASSWORD":
      return {
        title: "Invalid password",
        message: "The password is invalid or the user does not have a password."
      };

    case "USER_DISABLED":
      return {
        title: "User disabled",
        message: "The user account has been disabled by an administrator."
      };

    default:
      console.log("translateErrorCode", errorCode);

      return {
        title: "Error",
        message: "Something went wrong, try again later"
      };
  }
};
