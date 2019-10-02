import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  Header,
  HeaderButton,
  ScreenTitle,
  Pizza,
  Loader,
  ErrorHandler
} from "../../components";
import { SMALL, COLORS } from "../../constants/constants";
import { saveOrder } from "../../store/actions/builder";
import { loadingFinish, loadingStart } from "../../store/actions/utils";

const Checkout = ({ navigation }) => {
  const summary = useSelector(state => state.summary);
  const dispatch = useDispatch();

  const confirmOrderHandler = async () => {
    try {
      dispatch(loadingStart());
      await dispatch(saveOrder(summary, redirect));
      dispatch(loadingFinish());
    } catch {
      dispatch(loadingFinish());
    }
  };

  const redirect = () => {
    navigation.navigate({
      routeName: "PollResults"
    });
  };

  return (
    <>
      <ErrorHandler />
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenTitle title="Order summary:" />
        <View style={styles.pizzaContainer}>
          <Pizza changeIngredientsQty={true} size={SMALL} />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{summary.crust} </Text>
          <Text style={styles.listItemPrice}>10 €</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{summary.size}</Text>
          <Text style={styles.listItemPrice}>10 €</Text>
        </View>
        {Object.keys(summary.toppings).map(key => {
          return (
            <View style={styles.listItem} key={key}>
              <Text style={styles.listItemText}>{key}</Text>

              <Text style={styles.listItemPrice}>
                {summary.toppings[key]} x 1 € = {summary.toppings[key]}€
              </Text>
            </View>
          );
        })}
        <View style={styles.total}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>123123 €</Text>
        </View>

        <View style={styles.startButton}>
          <Loader>
            <Button
              title="Confirm your order"
              color="#F0B117"
              onPress={confirmOrderHandler}
            />
          </Loader>
        </View>
      </ScrollView>
    </>
  );
};

Checkout.navigationOptions = navigationData => {
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
  pizzaContainer: {
    width: "100%",
    height: 250,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  listItem: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "flex-start",
    marginVertical: 2,
    padding: 2,
    backgroundColor: COLORS.shadowColor
  },
  total: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    paddingVertical: 5
  },
  totalText: {
    fontFamily: "Damion",
    fontSize: 25
  },
  totalPrice: {
    fontFamily: "Damion",
    fontSize: 25,
    marginLeft: 20
  },
  listItemText: {
    textTransform: "capitalize",
    fontSize: 15
  },
  listItemPrice: {
    marginLeft: "auto"
  },
  container: {
    position: "relative",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingBottom: 40
  },
  startButton: {
    paddingTop: 30,
    width: "80%"
  }
});

export { Checkout };
