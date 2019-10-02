import React from "react";
import { View, StyleSheet } from "react-native";

import { THIN, THICK, CHEESY, GLUTENFREE } from "../../constants/constants";

const Crust = props => {
  const { pizzaCrust } = props;
  return (
    <View style={styles(props).wrapper}>
      <View style={styles(props).sauce}></View>
      <View style={styles(props).crust}>
        {pizzaCrust === CHEESY && (
          <>
            <View style={styles(props).cheeseWrapper}>
              <View style={styles(props).cheese}></View>
            </View>
            <View style={styles(props).cheeseWrapper}>
              <View style={styles(props).cheese}></View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    wrapper: {
      alignItems: "center"
    },
    crust: {
      width: 300,
      height:
        props.pizzaCrust === THIN ? 15 : props.pizzaCrust === THICK ? 30 : 20,
      backgroundColor: props.pizzaCrust === GLUTENFREE ? "#dec495" : "#EDC572",
      borderRadius: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    cheeseWrapper: {
      width: 20,
      height: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: "#EDC572",
      justifyContent: "center",
      alignItems: "center"
    },
    cheese: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: "#FFD697"
    },
    sauce: {
      width: 270,
      height: 5,
      backgroundColor: "#E91C33",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
    }
  });

export { Crust };
