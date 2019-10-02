import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";

import { BootUp, Auth } from "../screens";
import { DrawerNavigator } from "./DrawerNavigator";
import { COLORS } from "../constants/constants";

const AuthStackNavigator = createStackNavigator(
  {
    Auth: Auth
  },
  {
    mode: "modal",
    initialRouteName: "Auth",
    defaultNavigationOptions: {
      headerTintColor: COLORS.textSecondaryColor,
      headerStyle: {
        backgroundColor: COLORS.primaryColor
      }
    }
  }
);

const MainNavigator = createSwitchNavigator({
  BootUp: BootUp,
  Auth: AuthStackNavigator,
  Drawer: DrawerNavigator
});

export { MainNavigator };
