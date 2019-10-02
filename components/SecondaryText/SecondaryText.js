import React from "react";
import { Text, StyleSheet } from "react-native";

const SecondaryText = ({ children, addStyle }) => {
  return (
    <Text style={{ ...styles.secondaryText, ...addStyle }}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  secondaryText: { fontSize: 16, fontStyle: "italic", color: "#afafaf" }
});

export { SecondaryText };
