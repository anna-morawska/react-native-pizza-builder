import React from "react";
import { View, StyleSheet } from "react-native";

const Pineapple = ({ position }) => {
  return (
    <View
      style={{
        ...styles.pineapple,
        left: position ? position.left : `${Math.random() * 100}%`,
        top: position ? position.top : `${Math.random() * 100}%`,
        transform: position
          ? position.rotate
          : [{ rotate: `${Math.random() * 100}deg` }]
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  pineapple: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffff00",
    backgroundColor: "#fff8b9",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 15,
    zIndex: 2
  }
});

export { Pineapple };
