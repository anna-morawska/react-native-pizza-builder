import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import { Header, HeaderButton, ErrorHandler } from "../../components";
import { saveDeliveryAddress } from "../../store/actions/account";

const MapPreview = ({ navigation }) => {
  const deliveryAddress = useSelector(state => state.account.deliveryAddress);
  const dispatch = useDispatch();

  const [coordinates, setCoordinate] = useState(deliveryAddress);

  const mapRegion = {
    latitude: deliveryAddress.latitude ? deliveryAddress.latitude : 37.78825,
    longitude: deliveryAddress.longitude
      ? deliveryAddress.longitude
      : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setCoordinate({
      latitude,
      longitude
    });
  };

  useEffect(() => {
    navigation.setParams({
      saveDeliveryAddress: dispatchDeliveryAddress,
      isSaveDeliveryAddressActive:
        coordinates.latitude !== null && coordinates.longitude !== null
    });
  }, [coordinates]);

  const dispatchDeliveryAddress = useCallback(() => {
    const goBackToScreen = navigation.getParam("goBackToScreen");

    dispatch(saveDeliveryAddress({ deliveryAddress: coordinates }));
    navigation.navigate(goBackToScreen);
  }, [coordinates]);

  return (
    <>
      <ErrorHandler />
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {coordinates.latitude !== null && coordinates.longitude !== null && (
          <Marker coordinate={coordinates} title="Delivery address" />
        )}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

MapPreview.navigationOptions = navigationData => {
  const title = "Delivery address";
  const saveUserData = navigationData.navigation.getParam(
    "saveDeliveryAddress"
  );
  const isSaveDeliveryAddressActive = navigationData.navigation.getParam(
    "isSaveDeliveryAddressActive"
  );

  return {
    headerTitle: <Header text={title} />,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="save"
          color="blue"
          onPress={isSaveDeliveryAddressActive ? saveUserData : undefined}
        />
      </HeaderButtons>
    )
  };
};

export { MapPreview };
