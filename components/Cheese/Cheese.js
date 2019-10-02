import React from "react";
import { View, StyleSheet } from "react-native";
import uuidv4 from "uuid/v4";

const array = new Array(10);
const DATA_ARRAY = [];
for (let n of array) {
  DATA_ARRAY.push({ key: uuidv4() });
}

const Cheese = ({ position }) => {
  return (
    <View
      style={{
        ...styles.cheese,
        width: position ? 3 : styles.cheese.width,
        height: position ? 10 : styles.cheese.height
      }}
    >
      {DATA_ARRAY.map(item => (
        <View
          key={item.key}
          style={{
            ...styles.cheeseParticle,
            left: position ? position.left : `${Math.random() * 100}%`,
            top: position ? position.top : `${Math.random() * 100}%`,
            transform: position
              ? position.rotate
              : [{ rotate: `${Math.random() * 100}deg` }]
          }}
        ></View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cheese: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 300,
    overflow: "hidden"
  },
  cheeseParticle: {
    backgroundColor: "#FFD697",
    position: "relative",
    width: 3,
    height: 10,
    zIndex: 1
  }
});

export { Cheese };
