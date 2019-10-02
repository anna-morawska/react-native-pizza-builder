import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import uuidv4 from "uuid/v4";
import { useSelector } from "react-redux";

import { SMALL, MEDIUM, LARGE, TINY } from "../../constants/constants";
import { INGREDIENTS } from "../../data/data";

const Pizza = ({ size = LARGE, changeIngredientsQty }) => {
  const toppingsQty = useSelector(state => state.summary.toppings);

  let pizzaSize;
  switch (size) {
    case TINY:
      pizzaSize = 180;
      break;
    case SMALL:
      pizzaSize = 250;
      break;
    case MEDIUM:
      pizzaSize = 300;
      break;
    case LARGE:
      pizzaSize = 320;
      break;
  }

  const generateIngredients = () => {
    const ingredients = [];

    INGREDIENTS.map(
      ({ componentName, component: Component, welcomeScreenQty }) => {
        const value = changeIngredientsQty
          ? toppingsQty[componentName]
          : welcomeScreenQty;

        for (i = 1; i <= value; i++) {
          Component && ingredients.push(<Component key={uuidv4()} />);
        }
      }
    );

    return ingredients;
  };

  const memoizedIngredients = useMemo(() => generateIngredients(), [
    toppingsQty
  ]);

  return (
    <View style={styles(pizzaSize).outerEdge}>
      <View style={styles(pizzaSize).pizzaDough}>
        <View style={styles(pizzaSize).innerEdge}>
          <View style={styles(pizzaSize).tomatoSauce}>
            <View style={styles(pizzaSize).cut1}></View>
            <View style={styles(pizzaSize).cut2}></View>
            <View style={styles(pizzaSize).cut3}></View>
            <View style={styles(pizzaSize).cut4}></View>
            {memoizedIngredients}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = pizzaSize =>
  StyleSheet.create({
    cut1: {
      backgroundColor: "#a81021",
      height: "100%",
      width: 5,
      position: "absolute",
      left: "50%"
    },
    cut2: {
      backgroundColor: "#a81021",
      height: "100%",
      width: 5,
      position: "absolute",
      left: "50%",
      transform: [{ rotate: "45deg" }]
    },
    cut3: {
      backgroundColor: "#a81021",
      height: "100%",
      width: 5,
      position: "absolute",
      left: "50%",
      transform: [{ rotate: "90deg" }]
    },
    cut4: {
      backgroundColor: "#a81021",
      height: "100%",
      width: 5,
      position: "absolute",
      left: "50%",
      transform: [{ rotate: "135deg" }]
    },
    tomatoSauce: {
      backgroundColor: "#E91C33",
      width: 0.91 * pizzaSize,
      height: 0.91 * pizzaSize,
      borderRadius: 0.91 * pizzaSize,
      position: "relative",
      overflow: "hidden"
    },
    innerEdge: {
      width: 0.93 * pizzaSize,
      height: 0.93 * pizzaSize,
      borderRadius: 0.93 * pizzaSize,
      backgroundColor: "#ab5f2b",
      justifyContent: "center",
      alignItems: "center"
    },
    outerEdge: {
      width: 1.03 * pizzaSize,
      height: 1.03 * pizzaSize,
      borderRadius: 1.03 * pizzaSize,
      backgroundColor: "#ab5f2b",
      justifyContent: "center",
      alignItems: "center",
      transform: [{ rotate: "5deg" }]
    },
    pizzaDough: {
      width: pizzaSize,
      height: pizzaSize,
      borderRadius: pizzaSize,
      backgroundColor: "#F0B117",
      justifyContent: "center",
      alignItems: "center"
    }
  });

export { Pizza };
