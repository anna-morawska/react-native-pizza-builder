import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  Pizza,
  Header,
  HeaderButton,
  Footer,
  ScreenTitle,
  IngredientsList,
  ErrorHandler
} from "../../components";

import { SMALL } from "../../constants/constants";

const Toppings = ({ navigation }) => {
  const changeScreenHandler = () => {
    navigation.navigate({
      routeName: "Delivery",
      params: {
        title: "Delivery"
      }
    });
  };

  return (
    <>
      <ErrorHandler />
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenTitle title="Choose Your Favorite Toppings:" />
        <View style={styles.pizzaContainer}>
          <Pizza size={SMALL} changeIngredientsQty={true}></Pizza>
        </View>
        <IngredientsList />
        <Footer nextStep="Delivery" onPress={changeScreenHandler} />
      </ScrollView>
    </>
  );
};

Toppings.navigationOptions = navigationData => {
  const title = navigationData.navigation.getParam("title");

  return {
    headerTitle: <Header text={title} />,
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
    alignItems: "center",
    backgroundColor: "#fafafa"
  },
  pizzaContainer: {
    width: 330,
    height: 330,
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  }
});

export { Toppings };
