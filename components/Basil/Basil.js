import React from "react";
import { View, StyleSheet } from "react-native";

const Basil = ({ position }) => {
  return (
    <View
      style={{
        ...styles.basil,
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
  basil: {
    position: "absolute",
    width: 10,
    height: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 20,
    borderBottomEndRadius: 30,

    backgroundColor: "#7fab2b",
    zIndex: 2
  }
});

export { Basil };
