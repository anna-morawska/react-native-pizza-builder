import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#F9424D",
    width: "100%",
    paddingVertical: 10
  },
  text: {
    marginRight: 30,
    width: "100%",
    fontSize: 35,
    color: "#fff",
    textAlign: "right",
    fontFamily: "Damion"
  }
});
