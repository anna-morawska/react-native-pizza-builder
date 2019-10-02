import React, { useState } from "react";
import { View, Text, StyleSheet, Slider as NativeSlider } from "react-native";

import { COLORS } from "../../constants/constants";

const Slider = props => {
  const [sliderValue, setSliderValue] = useState(props.initialValue);

  const valueChangeHandler = value => {
    setSliderValue(value);
    props.valueChangeHandler(value);
  };

  return (
    <View>
      {props.labels && (
        <View style={styles(props).labels}>
          {props.labels.map(label => (
            <View key={label} style={styles(props).labelWrapper}>
              <Text style={styles(props).labelText}>{label}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles(props).container}>
        <View style={styles(props).wrapper}>
          <View style={styles(props).triangle}></View>
          <View style={styles(props).circle}></View>
        </View>
        <NativeSlider
          style={styles(props).nativeSlider}
          value={sliderValue}
          onSlidingComplete={valueChangeHandler}
          maximumTrackTintColor="transparent"
          minimumTrackTintColor="transparent"
          thumbTintColor={COLORS.primaryColor}
          {...props}
        />
      </View>
    </View>
  );
};

Slider.defaultProps = {
  width: 300,
  height: 30,
  minimumValue: 0,
  maximumValue: 50
};

const styles = props =>
  StyleSheet.create({
    container: {
      borderRadius: 50,
      overflow: "hidden"
    },
    labelWrapper: {
      flex: 1
    },
    labels: {
      width: props.width,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10
    },
    labelText: {
      fontFamily: "Damion",
      fontSize: 13,
      textAlign: "center"
    },
    shadowColor: {
      width: props.width,
      height: props.height,
      borderRadius: 50,
      position: "absolute"
    },
    wrapper: {
      backgroundColor: "transparent",
      position: "relative"
    },
    circle: {
      backgroundColor: COLORS.shadowColor,
      position: "absolute",
      left: props.width,
      height: props.height,
      width: props.height / 2,
      borderBottomRightRadius: props.height,
      borderTopRightRadius: props.height
    },
    triangle: {
      width: 0,
      height: 0,
      position: "absolute",
      borderTopColor: "transparent",
      borderTopWidth: props.height / 2,
      borderRightColor: COLORS.shadowColor,
      borderRightWidth: props.width,
      borderBottomWidth: props.height / 2,
      borderBottomColor: "transparent",
      borderLeftWidth: 0,
      borderLeftColor: "transparent"
    },
    nativeSlider: {
      width: props.width,
      height: props.height,
      borderRadius: props.height
    }
  });

export { Slider };
