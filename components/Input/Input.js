import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../../constants/constants";

const Input = React.forwardRef(
  (
    {
      label,
      id,
      onInputChange,
      initiallyValid,
      initialValue,
      required,
      email,
      min,
      max,
      minLength,
      ...props
    },
    ref
  ) => {
    const [inputState, dispatch] = useReducer(
      inputReducer,
      getInitialState({ initiallyValid, initialValue })
    );

    useEffect(() => {
      if (inputState.touched) {
        onInputChange(id, inputState.value, inputState.isValid);
      }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
      const [isValid, error] = validate({
        text,
        required,
        email,
        min,
        max,
        minLength
      });

      dispatch({ type: INPUT_CHANGE, value: text, isValid, error });
    };

    const lostFocusHandler = () => {
      dispatch({ type: INPUT_BLUR });
    };

    const { isValid, touched, value, error } = inputState;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          ref={ref}
          {...props}
        />
        {!isValid && touched && (
          <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 8
  },
  label: {
    marginVertical: 8,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "600",
    color: "#afafaf"
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderBottomColor: "#afafaf",
    borderBottomWidth: 1
  },
  errorWrapper: {
    marginVertical: 5
  },
  errorText: {
    color: COLORS.primaryColor,
    fontSize: 10
  }
});

export { Input };

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

function getInitialState({ initiallyValid, initialValue }) {
  return {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    touched: false,
    error: ""
  };
}

function inputReducer(state, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        error: action.error,
        touched: true
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
}

function validate({ text, required, email, min, max, minLength }) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let isValid = true;
  let error = "";

  if (required && text.trim().length === 0) {
    isValid = false;
    error = "This field is required";
  }
  if (email && !emailRegex.test(text.toLowerCase())) {
    isValid = false;
    error = "Please enter valid email address";
  }
  if (min != null && +text < min) {
    isValid = false;
    error = "Value is too small";
  }
  if (max != null && +text > max) {
    isValid = false;
    error = "Value is too big";
  }
  if (minLength != null && text.length < minLength) {
    isValid = false;
    error = `Value is too short, must have at least ${minLength} characters`;
  }

  return [isValid, error];
}
