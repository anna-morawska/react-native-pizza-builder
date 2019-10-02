import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import {
  Header,
  HeaderButton,
  ScreenTitle,
  Loader,
  Table,
  SecondaryText,
  ErrorHandler
} from "../../components";
import { fetchUserOrders } from "../../store/actions/account";
import { loadingStart, loadingFinish } from "../../store/actions/utils";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.account.userOrders);

  useEffect(() => {
    const loadOrders = async () => {
      dispatch(loadingStart());
      await dispatch(fetchUserOrders());
      dispatch(loadingFinish());
    };
    loadOrders();
  }, []);

  return (
    <>
      <ErrorHandler />
      <View style={styles.container}>
        <ScreenTitle title="Your Orders:" />
        <View style={styles.ordersWrapper}>
          <Loader>
            {orders === null ? (
              <SecondaryText>You haven't ordered anything yet</SecondaryText>
            ) : (
              <Table data={orders}></Table>
            )}
          </Loader>
        </View>
      </View>
    </>
  );
};

Orders.navigationOptions = navData => {
  return {
    headerTitle: <Header text="Orders" />,
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
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fafafa"
  },
  ordersWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});

export { Orders };
