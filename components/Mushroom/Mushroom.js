import React from "react";
import { View, StyleSheet } from "react-native";

const Mushroom = ({ position }) => {
  return (
    <View
      style={{
        ...styles.mushroom,
        left: position ? position.left : `${Math.random() * 100}%`,
        top: position ? position.top : `${Math.random() * 100}%`,
        transform: position
          ? position.rotate
          : [{ rotate: `${Math.random() * 100}deg` }]
      }}
    >
      <View style={styles.mushroomLeg}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mushroomLeg: {
    position: "absolute",
    backgroundColor: "#c7b2a5",
    width: 10,
    height: 13,
    left: 10,
    bottom: -13,
    zIndex: 2
  },
  mushroom: {
    position: "absolute",
    backgroundColor: "#a7a7a7",
    width: 30,
    height: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  }
});

export { Mushroom };
