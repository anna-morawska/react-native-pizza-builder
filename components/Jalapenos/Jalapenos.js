import React from "react";
import { View, StyleSheet } from "react-native";

const Jalapenos = ({ position }) => {
  return (
    <View
      style={{
        ...styles.jalapenos,
        left: position ? position.left : `${Math.random() * 100}%`,
        top: position ? position.top : `${Math.random() * 100}%`
      }}
    >
      <View style={styles.jalapenosInnerLevel1}>
        <View style={styles.jalapenosInnerLevel2}>
          <View style={styles.jalapenosInnerLevel3}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jalapenos: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#399913",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  jalapenosInnerLevel1: {
    width: 17,
    height: 17,
    borderRadius: 17,
    backgroundColor: "#b8db9b",
    justifyContent: "center",
    alignItems: "center"
  },
  jalapenosInnerLevel2: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  jalapenosInnerLevel3: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#b8db9b",
    justifyContent: "center",
    alignItems: "center"
  }
});

export { Jalapenos };
