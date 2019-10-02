import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  Pizza,
  HeaderButton,
  Header,
  Footer,
  Slider,
  ScreenTitle,
  ErrorHandler
} from "../../components";
import { SMALL, MEDIUM, LARGE } from "../../constants/constants";
import { setPizzaSize } from "../../store/actions/builder";

const Size = ({ navigation }) => {
  const pizzaSize = useSelector(state => state.summary.size);
  const dispatch = useDispatch();

  const changeScreenHandler = () => {
    navigation.navigate({
      routeName: "Thickness",
      params: {
        price: "23123123",
        title: "Thickness"
      }
    });
  };

  const valueChangeHandler = value => {
    let size;

    if (typeof value === "string") {
      switch (value) {
        case SMALL:
          size = 1;
          break;
        case MEDIUM:
          size = 2;
          break;
        case LARGE:
          size = 3;
          break;
        default:
          size = 1;
      }

      return size;
    } else {
      switch (value) {
        case 1:
          size = SMALL;
          break;
        case 2:
          size = MEDIUM;
          break;
        case 3:
          size = LARGE;
          break;
        default:
          size = SMALL;
      }

      dispatch(setPizzaSize(size));
    }
  };

  return (
    <>
      <ErrorHandler />
      <View style={styles.container}>
        <ScreenTitle title="Choose the size:" />
        <View style={styles.pizzaContainer}>
          <Pizza size={pizzaSize} changeIngredientsQty={true}></Pizza>
        </View>

        <Slider
          width={300}
          height={30}
          minimumValue={1}
          maximumValue={3}
          step={1}
          labels={[SMALL, MEDIUM, LARGE]}
          initialValue={valueChangeHandler(pizzaSize)}
          valueChangeHandler={valueChangeHandler}
        />
        <Footer nextStep="Thickness" onPress={changeScreenHandler} />
      </View>
    </>
  );
};

Size.navigationOptions = navigationData => {
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

export { Size };
