import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScreenTitle = ({ title, small }) => {
  return (
    <View style={styles.title}>
      <Text style={{ ...styles.titleText, fontSize: small ? 20 : 30 }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 30,
    marginHorizontal: 20
  },
  titleText: {
    fontFamily: "Damion",
    textAlign: "center"
  }
});

export { ScreenTitle };
