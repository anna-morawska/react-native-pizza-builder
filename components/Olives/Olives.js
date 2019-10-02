import React from "react";
import { View, StyleSheet } from "react-native";

const Olives = ({ position }) => {
  return (
    <View
      style={{
        ...styles.olive,
        left: position ? position.left : `${Math.random() * 100}%`,
        top: position ? position.top : `${Math.random() * 100}%`
      }}
    >
      <View style={styles.inner}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  olive: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#211433",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: "#E91C33"
  }
});

export { Olives };
