import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  Header,
  HeaderButton,
  Footer,
  Slider,
  ScreenTitle,
  Crust,
  ErrorHandler
} from "../../components";

import { setPizzaCrust } from "../../store/actions/builder";

import { THIN, THICK, CHEESY, GLUTENFREE } from "../../constants/constants";

const Thickness = ({ navigation }) => {
  const pizzaCrust = useSelector(state => state.summary.crust);
  const dispatch = useDispatch();

  const changeScreenHandler = () => {
    navigation.navigate({
      routeName: "Toppings",
      params: {
        title: "Toppings"
      }
    });
  };

  const valueChangeHandler = value => {
    let crust;

    if (typeof value === "string") {
      switch (value) {
        case THIN:
          return 1;
        case THICK:
          return 2;
        case CHEESY:
          return 3;
        case GLUTENFREE:
          return 4;
        default:
          return 1;
      }
    } else {
      switch (value) {
        case 1:
          crust = THIN;
          break;
        case 2:
          crust = THICK;
          break;
        case 3:
          crust = CHEESY;
          break;
        case 4:
          crust = GLUTENFREE;
          break;
        default:
          crust = THIN;
      }
      dispatch(setPizzaCrust(crust));
    }
  };

  return (
    <>
      <ErrorHandler />
      <View style={styles.container}>
        <ScreenTitle title="Choose Pizza Crust:" />
        <View style={styles.pizzaContainer}>
          <Crust pizzaCrust={pizzaCrust} />
        </View>
        <Slider
          width={350}
          height={30}
          minimumValue={1}
          maximumValue={4}
          step={1}
          initialValue={valueChangeHandler(pizzaCrust)}
          labels={[THIN, THICK, CHEESY, GLUTENFREE]}
          valueChangeHandler={valueChangeHandler}
        />
        <Footer nextStep="Toppings" onPress={changeScreenHandler} />
      </View>
    </>
  );
};

Thickness.navigationOptions = navigationData => {
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
    position: "relative",
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fafafa"
  },
  pizzaContainer: {
    width: 330,
    height: 330,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60
  }
});

export { Thickness };
