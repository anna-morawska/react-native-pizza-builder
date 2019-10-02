import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Entypo } from "@expo/vector-icons";

import {
  Checkout,
  Size,
  Thickness,
  Toppings,
  Delivery,
  MapPreview,
  PollResults
} from "../screens";
import { BottomTabNavigator } from "./BottomNavigator";
import { DrawerContent } from "../components";
import { COLORS } from "../constants/constants";

const PollResultsNavigator = createStackNavigator(
  {
    PollResults: {
      screen: PollResults,
      title: "Poll Results"
    }
  },
  {
    mode: "modal",
    initialRouteName: "PollResults",
    defaultNavigationOptions: {
      headerTintColor: COLORS.textSecondaryColor,
      headerStyle: {
        backgroundColor: COLORS.primaryColor
      }
    }
  }
);

const BuilderStackNavigator = createStackNavigator(
  {
    Size: {
      screen: Size,
      title: "Size"
    },
    Thickness: {
      screen: Thickness,
      title: "Thickness"
    },
    Toppings: {
      screen: Toppings,
      title: "Toppings"
    },
    Delivery: {
      screen: Delivery,
      title: "Delivery"
    },
    MapPreview: {
      screen: MapPreview,
      title: "MapPreview"
    },
    Checkout: {
      screen: Checkout,
      title: "Checkout"
    }
  },
  {
    mode: "modal",
    initialRouteName: "Size",
    defaultNavigationOptions: {
      headerTintColor: COLORS.textSecondaryColor,
      headerStyle: {
        backgroundColor: COLORS.primaryColor
      }
    }
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Builder: {
      screen: BuilderStackNavigator,
      navigationOptions: {
        drawerIcon: tabInformation => (
          <Entypo name="cog" size={20} color={tabInformation.tintColor} />
        )
      }
    },
    Account: {
      screen: BottomTabNavigator,
      navigationOptions: {
        drawerIcon: tabInformation => (
          <Entypo name="user" size={20} color={tabInformation.tintColor} />
        )
      }
    },
    PollResults: {
      screen: PollResultsNavigator,
      navigationOptions: {
        drawerLabel: "Poll Results",
        drawerIcon: tabInformation => (
          <Entypo name="info" size={20} color={tabInformation.tintColor} />
        )
      }
    }
  },
  {
    contentComponent: DrawerContent,
    unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: COLORS.primaryColor,
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        width: 30
      }
    }
  }
);

export { DrawerNavigator };
