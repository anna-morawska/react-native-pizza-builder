import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  Pizza,
  Header,
  ScreenTitle,
  HeaderButton,
  ErrorHandler
} from "../../components";

import { COLORS } from "../../constants/constants";

const Welcome = ({ navigation }) => {
  const changeScreenHandler = () => {
    navigation.navigate({
      routeName: "Size",
      params: {
        title: "Size"
      }
    });
  };

  return (
    <>
      <ErrorHandler />
      <View style={styles.container}>
        <ScreenTitle title="Order an imaginary pizza, a the one you like the most!" />
        <View style={styles.pizzaContainer}>
          <Pizza />
        </View>
        <View style={styles.startButton}>
          <Button
            title="start"
            color={COLORS.secondaryColor}
            onPress={changeScreenHandler}
          />
        </View>
      </View>
    </>
  );
};

Welcome.navigationOptions = navData => {
  return {
    headerTitle: <Header text="Pizza Builder" />,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  pizzaContainer: {
    width: 330,
    height: 330,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "#fafafa"
  },
  startButton: {
    paddingTop: 20,
    width: "80%"
  }
});

export { Welcome };
