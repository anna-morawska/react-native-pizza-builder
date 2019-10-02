import React, { useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import {
  Header,
  HeaderButton,
  ImagePicker,
  ScreenTitle,
  LocationPicker,
  Footer,
  ErrorHandler
} from "../../components";
import { saveUserDataOnServer } from "../../store/actions/account";

const Delivery = ({ navigation }) => {
  const dispatch = useDispatch();

  const changeScreenHandler = () => {
    navigation.navigate({
      routeName: "Checkout",
      params: {
        title: "Checkout"
      }
    });
  };

  useEffect(() => {
    navigation.setParams({
      saveUserData: saveUserData
    });
  }, []);

  const redirect = () => {
    navigation.navigate({
      routeName: "MapPreview",
      params: {
        goBackToScreen: "Delivery"
      }
    });
  };

  const saveUserData = useCallback(() => {
    dispatch(saveUserDataOnServer());
  }, []);

  return (
    <>
      <ErrorHandler />
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenTitle title="Payment & delivery details " />
        <Text style={styles.text}>
          Take a photo of both sides of your credit card*
        </Text>
        <ImagePicker />
        <Text style={{ ...styles.text, marginTop: 30 }}>
          Where to deliver your pizza?
        </Text>
        <LocationPicker redirect={redirect} />
        <Footer nextStep="Summary" onPress={changeScreenHandler} />
      </ScrollView>
    </>
  );
};

Delivery.navigationOptions = navigationData => {
  const title = navigationData.navigation.getParam("title");
  const saveUserData = navigationData.navigation.getParam("saveUserData");

  return {
    headerTitle: <Header text={title} />,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="save" onPress={saveUserData} />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fafafa",
    paddingBottom: 100,
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30
  }
});

export { Delivery };
