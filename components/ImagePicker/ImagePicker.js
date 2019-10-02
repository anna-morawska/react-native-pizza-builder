import React from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import * as LaunchCamera from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useSelector, useDispatch } from "react-redux";

import { saveUserPhoto } from "../../store/actions/account";
import { COLORS } from "../../constants/constants";

const ImagePicker = ({ hideInfo }) => {
  const userImg = useSelector(state => state.account.userImg);
  const dispatch = useDispatch();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You have not granted permissions to camera, just continue",
        [{ text: "ok" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const image = await LaunchCamera.launchCameraAsync({
        quality: 0.6
      });

      dispatch(saveUserPhoto({ userImg: image.uri }));
    } else {
      Alert.alert(
        "Permission denied",
        "You have not granted permissions to camera, just continue",
        [{ text: "ok" }]
      );
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={
              !userImg
                ? require("../../assets/creditCard.png")
                : {
                    uri: userImg
                  }
            }
          />
        </View>
        {!hideInfo && (
          <Text style={styles.textSmall}>
            No, don't do that, seriously, I'm just learning how to use device
            camera. Take a random picture.
          </Text>
        )}
        <View style={styles.buttonWrapper}>
          <Button
            color={COLORS.secondaryColor}
            title="Take a picture"
            onPress={takeImageHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  textSmall: {
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic"
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 15
  },
  buttonWrapper: {
    paddingTop: 10,
    width: "100%",
    alignSelf: "center"
  }
});

export { ImagePicker };
