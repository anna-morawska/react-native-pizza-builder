import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Entypo } from "@expo/vector-icons";

import { Account, Orders } from "../screens";
import { COLORS } from "../constants/constants";

const AccounttackNavigator = createStackNavigator(
  {
    Account: Account
  },
  {
    mode: "modal",
    initialRouteName: "Account",
    defaultNavigationOptions: {
      headerTintColor: COLORS.textSecondaryColor,
      headerStyle: {
        backgroundColor: COLORS.primaryColor
      }
    }
  }
);

const OrdersStackNavigator = createStackNavigator(
  {
    Orders: Orders
  },
  {
    mode: "modal",
    initialRouteName: "Orders",
    defaultNavigationOptions: {
      headerTintColor: COLORS.textSecondaryColor,
      headerStyle: {
        backgroundColor: COLORS.primaryColor
      }
    }
  }
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Settings: {
      screen: AccounttackNavigator,
      navigationOptions: {
        tabBarIcon: tabInformation => (
          <Entypo
            name="credit-card"
            size={23}
            color={tabInformation.tintColor}
          />
        )
      }
    },
    Orders: {
      screen: OrdersStackNavigator,
      navigationOptions: {
        tabBarIcon: tabInformation => (
          <Entypo
            name="back-in-time"
            size={23}
            color={tabInformation.tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: COLORS.secondaryColor
    }
  }
);

export { BottomTabNavigator };
