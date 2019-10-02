import React from "react";
import { View, StyleSheet } from "react-native";

const Becon = ({ position }) => {
  return (
    <View
      style={{
        ...styles.bacon,
        left: position ? position.left : `${Math.random() * 100}%`,
        top: position ? position.top : `${Math.random() * 100}%`
      }}
    >
      <View style={styles.light} />
      <View style={styles.dark} />
      <View style={styles.light} />
    </View>
  );
};

const styles = StyleSheet.create({
  bacon: {
    position: "absolute",
    width: 28,
    height: 28,
    zIndex: 2,
    flexDirection: "row"
  },
  light: {
    height: "100%",
    width: 8,
    backgroundColor: "#b14f4f"
  },
  dark: {
    height: "100%",
    width: 8,
    backgroundColor: "#d1ad69"
  }
});

export { Becon };
