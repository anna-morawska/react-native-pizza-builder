import { useEffect } from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { clearError } from "../../store/actions/utils";

const ErrorHandler = () => {
  let error = useSelector(state => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.title && error.message) {
      Alert.alert(error.title, error.message, [
        {
          text: "Ok",
          onPress: () => {
            dispatch(clearError());
          }
        }
      ]);
    }
  }, [error.message, error.title]);
  return null;
};

export { ErrorHandler };
