import { createAppContainer } from "react-navigation";

import { MainNavigator } from "./StackNavigator";

const AppContainer = createAppContainer(MainNavigator);

export { AppContainer };
