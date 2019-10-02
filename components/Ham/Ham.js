import React from "react";
import { View, StyleSheet } from "react-native";

const Ham = ({ position }) => {
  return (
    <View
      style={{
        ...styles.bacon,
        left: position ? position.left : `${Math.random() * 100}%`,
        top: position ? position.top : `${Math.random() * 100}%`,
        transform: position
          ? position.rotate
          : [{ rotate: `${Math.random() * 100}deg` }]
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
    borderRadius: 5,
    backgroundColor: "#ffc0cb",
    zIndex: 2
  }
});

export { Ham };
