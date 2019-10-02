import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useScreens } from "react-native-screens";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

import { AppContainer } from "./navigation/RootNavigator";
import { store } from "./store/store";

useScreens();

const fetchFont = () => {
  return Font.loadAsync({
    Damion: require("./assets/fonts/Damion-Regular.ttf")
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log("error")}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppContainer style={styles.root}></AppContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%"
  }
});
