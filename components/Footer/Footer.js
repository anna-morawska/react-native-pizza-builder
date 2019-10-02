import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { COLORS } from "../../constants/constants";

const Footer = ({ nextStep, onPress }) => {
  const price = useSelector(state => state.summary.price);
  return (
    <View style={styles.container}>
      <View style={styles.priceWrapper}>
        <Text style={styles.text}>{price.toFixed(2).toString()} €</Text>
      </View>
      <View style={styles.nextStepWrapper}>
        <Text style={styles.nextStepText}>{nextStep}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonWrapper}>
          <AntDesign
            name="arrowright"
            size={30}
            color={COLORS.textSecondaryColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 50,
    width: "100%",
    backgroundColor: COLORS.secondaryColor,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  nextStepWrapper: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  priceWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  button: {
    height: "100%",
    backgroundColor: COLORS.secondaryColor,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  nextStepText: {
    color: COLORS.textSecondaryColor,
    fontSize: 30,
    fontFamily: "Damion"
  },
  text: {
    color: COLORS.textSecondaryColor,
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 8
  }
});

export { Footer };
