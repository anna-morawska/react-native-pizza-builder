import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import { COLORS } from "../../constants/constants";

const Loader = ({ children }) => {
  const loading = useSelector(state => state.loading);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primaryColor} />
    </View>
  ) : (
    <>{children}</>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { Loader };
