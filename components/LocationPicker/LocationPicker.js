import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useSelector, useDispatch } from "react-redux";

import { Loader } from "../../components";
import { COLORS } from "../../constants/constants";
import { GOOGLE_MAPS_API_KEY } from "../../env";
import { loadingStart, loadingFinish } from "../../store/actions/utils";
import { saveDeliveryAddress } from "../../store/actions/account";

const LocationPicker = ({ redirect }) => {
  const dispatch = useDispatch();
  const deliveryAddress = useSelector(state => state.account.deliveryAddress);

  const [locationStaticImage, setLocationStaticImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You have not granted permissions to location API, just continue",
        [{ text: "ok" }]
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (
      deliveryAddress.latitude !== null &&
      deliveryAddress.longitude !== null
    ) {
      const url = `https://maps.googleapis.com/maps/api/staticmap?center=${deliveryAddress.latitude},${deliveryAddress.longitude}&zoom=14&size=200x120&maptype=roadmap&markers=color:red%7Clabel:A%7C${deliveryAddress.latitude},${deliveryAddress.longitude}&key=${GOOGLE_MAPS_API_KEY}`;

      setLocationStaticImage(url);
    }
  }, [deliveryAddress]);

  const getLocation = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      try {
        dispatch(loadingStart());
        const location = await Location.getCurrentPositionAsync();

        dispatch(
          saveDeliveryAddress({
            deliveryAddress: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }
          })
        );
        dispatch(loadingFinish());
      } catch (error) {
        dispatch(loadingFinish());
        Alert.alert(
          "Could not fetch location",
          "Please try again later or pick location on the map manually",
          [{ text: "ok" }]
        );
      }
    } else {
      dispatch(loadingFinish());
      Alert.alert(
        "Permission denied",
        "You have not granted permissions to location API, just continue",
        [{ text: "ok" }]
      );
    }

    return;
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={redirect} style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={
              !locationStaticImage
                ? require("../../assets/map.png")
                : {
                    uri: locationStaticImage
                  }
            }
          />
        </TouchableOpacity>
        <View style={styles.buttonsWrapper}>
          <Loader>
            <>
              <Button
                color={COLORS.secondaryColor}
                title="Get your location"
                onPress={getLocation}
              />
              <Button
                style={styles.button}
                color={COLORS.secondaryColor}
                title="Pick on map"
                onPress={redirect}
              />
            </>
          </Loader>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 15
  },
  button: {
    width: 100
  },
  buttonsWrapper: {
    paddingTop: 40,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export { LocationPicker };
