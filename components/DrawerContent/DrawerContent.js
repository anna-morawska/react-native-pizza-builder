import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";

const DrawerContent = props => {
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <ImageBackground
          style={styles.image}
          source={require("../../assets/bg.png")}
        >
          <View style={styles.overlay} />
        </ImageBackground>
        <DrawerNavigatorItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 130
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
    opacity: 0.3
  }
});

export { DrawerContent };
