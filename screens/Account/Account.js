import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import {
  Header,
  HeaderButton,
  ScreenTitle,
  ImagePicker,
  LocationPicker,
  SecondaryText,
  ErrorHandler
} from "../../components";
import { saveUserDataOnServer } from "../../store/actions/account";

// functionality to store in global state

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { deliveryAddress, userImg } = useSelector(state => state.account);

  useEffect(() => {
    navigation.setParams({
      saveUserData: saveUserData
    });
  }, []);

  const redirect = () => {
    navigation.navigate({
      routeName: "MapPreview",
      params: {
        goBackToScreen: "Account"
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
        <ScreenTitle title="Account Settings" />
        <View style={styles.section}>
          {userImg === null ? (
            <SecondaryText addStyle={styles.sectionHeader}>
              Add payment method:
            </SecondaryText>
          ) : (
            <SecondaryText addStyle={styles.sectionHeader}>
              Your payment method
            </SecondaryText>
          )}
          <ImagePicker hideInfo={true} />
        </View>
        <View style={styles.section}>
          {deliveryAddress.latitude === null &&
          deliveryAddress.longitude === null ? (
            <SecondaryText addStyle={styles.sectionHeader}>
              Add delivery address:
            </SecondaryText>
          ) : (
            <SecondaryText addStyle={styles.sectionHeader}>
              Your delivery address:
            </SecondaryText>
          )}
          <LocationPicker redirect={redirect} />
        </View>
      </ScrollView>
    </>
  );
};

Account.navigationOptions = navData => {
  const saveUserData = navData.navigation.getParam("saveUserData");

  return {
    headerTitle: <Header text="Account" />,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="save" onPress={saveUserData} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fafafa"
  },
  section: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30
  },
  sectionHeader: {
    width: "100%",
    textAlign: "left"
  }
});

export { Account };
