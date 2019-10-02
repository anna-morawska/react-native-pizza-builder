import React, { useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../../components";
import { authenticate } from "../../store/actions/auth/";
import { getUserData } from "../../store/actions/account";
import { loadingStart, loadingFinish } from "../../store/actions/utils";

const BootUp = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(loadingStart());
      const userData = await AsyncStorage.getItem("userData");
      dispatch(loadingFinish());

      if (!userData) {
        navigation.navigate("Auth");
        return;
      }

      const transformedUserData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedUserData;

      isUserDataValid = checkIfTokenValid({ token, userId, expirationDate });

      if (!isUserDataValid) {
        dispatch(loadingFinish());
        navigation.navigate("Auth");
        return;
      } else {
        dispatch(authenticate({ token, userId }));
        await dispatch(getUserData());
        dispatch(loadingFinish());
        navigation.navigate("Drawer");
      }
    };

    checkAuth();
  }, [dispatch]);

  const checkIfTokenValid = ({ token, userId, expirationDate }) => {
    const expirationDateInDateFormat = new Date(expirationDate);

    if (expirationDateInDateFormat <= new Date() || !token || !userId) {
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Loader></Loader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa"
  }
});

export { BootUp };
