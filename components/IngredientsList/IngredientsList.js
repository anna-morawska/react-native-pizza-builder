import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Slider } from "../../components";

import { INGREDIENTS } from "../../data/data";
import { setPizzaIngredients } from "../../store/actions/builder";

const IngredientsList = () => {
  const dispatch = useDispatch();
  const toppingsQty = useSelector(state => state.summary.toppings);

  const valueChangeHandler = name => value => {
    const qty = Math.floor(value);

    dispatch(setPizzaIngredients({ name, qty }));
  };

  return (
    <View style={styles.ingredientsWrapper}>
      {INGREDIENTS.map(({ name, component: Component, componentName }) => {
        return (
          <View key={name} style={styles.lisItem}>
            <View style={styles.ingredientWrapper}>
              {componentName === "Cheese" ? (
                <View style={styles.cheese} />
              ) : (
                <Component position={{ top: 5, left: 8, rotation: 0 }} />
              )}
            </View>
            <Text style={styles.lisItemText}>{name}</Text>
            <View style={styles.sliderWrapper}>
              <Slider
                width={200}
                height={30}
                minimumValue={1}
                maximumValue={20}
                initialValue={toppingsQty[componentName]}
                valueChangeHandler={valueChangeHandler(componentName)}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientsWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 90
  },
  lisItem: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    width: "80%"
  },
  ingredientWrapper: {
    position: "relative",
    width: 40,
    height: 40
  },
  lisItemText: {
    fontSize: 18,
    fontFamily: "Damion"
  },
  cheese: {
    width: 30,
    height: 20,
    backgroundColor: "#FFD697",
    position: "absolute",
    top: 10,
    left: 2
  },
  sliderWrapper: {
    marginLeft: "auto"
  }
});

export { IngredientsList };
