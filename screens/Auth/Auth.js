import React, {
  useState,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";

import {
  Pizza,
  Header,
  ScreenTitle,
  Input,
  Loader,
  ErrorHandler
} from "../../components";

import { COLORS, TINY } from "../../constants/constants";
import { singUp, signIn } from "../../store/actions/auth";
import { loadingStart, loadingFinish } from "../../store/actions/utils";

const Auth = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formState, dispatchLocal] = useReducer(formReducer, initialFormState);
  const passwordInputRef = useRef();
  const dispatchGlobal = useDispatch();

  const inputChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchLocal({
        type: UPDATE_FORM,
        value,
        id,
        isValid
      });
    },
    [dispatchLocal]
  );

  const authHandler = async () => {
    if (!formState.formValidity) {
      Alert.alert("Error", "Please check errors in the form", [
        {
          text: "Ok"
        }
      ]);
      return;
    }

    const { email, password } = formState.inputValues;

    if (isSignUp) {
      dispatchGlobal(loadingStart());
      await dispatchGlobal(singUp({ email, password, redirect }));
      dispatchGlobal(loadingFinish());
    } else {
      dispatchGlobal(loadingStart());
      await dispatchGlobal(signIn({ email, password, redirect }));
      dispatchGlobal(loadingFinish());
    }
  };

  const onSubmitEditing = ({ submit }) => () => {
    submit ? passwordInputRef.current.focus() : authHandler();
  };

  const redirect = () => {
    navigation.navigate("Builder");
  };

  return (
    <>
      <ErrorHandler />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={30}
        style={styles.container}
      >
        <ScreenTitle title="Order an imaginary pizza, a the one you like the most!" />
        <View style={styles.pizzaContainer}>
          <Pizza size={TINY} />
        </View>
        <View style={styles.formWrapper}>
          <Input
            id="email"
            label="E-mail"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            onInputChange={inputChangeHandler}
            onSubmitEditing={onSubmitEditing({ submit: false })}
            required
            email
          />
          <Input
            ref={passwordInputRef}
            id="password"
            label="Password"
            returnKeyType="send"
            autoCapitalize="none"
            keyboardType="default"
            onInputChange={inputChangeHandler}
            onSubmitEditing={onSubmitEditing({ submit: true })}
            minLength={6}
            required
            blurOnSubmit={true}
            secureTextEntry={true}
          />
          <View style={styles.startButton}>
            <Loader>
              <Button
                color={COLORS.secondaryColor}
                onPress={authHandler}
                title={isSignUp ? "SIGN UP" : "LOGIN"}
              />
            </Loader>
          </View>
          <View style={styles.switch}>
            <Text style={styles.switchText}>
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account? "}
            </Text>
            <TouchableOpacity
              onPress={() => setIsSignUp(currentMode => !currentMode)}
            >
              <View style={styles.switchBtn}>
                <Text style={styles.switchBtnText}>
                  {isSignUp ? "Log in" : "Sign up"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

Auth.navigationOptions = navData => {
  return {
    headerTitle: <Header text="Pizza Builder" />
  };
};

const styles = StyleSheet.create({
  pizzaContainer: {
    width: 180,
    height: 180,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  formWrapper: {
    marginTop: "auto",
    marginBottom: 20,
    width: "80%",
    backgroundColor: "#fafafa"
  },
  switch: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center"
  },
  switchBtn: {
    marginLeft: 5
  },
  switchBtnText: {
    color: COLORS.primaryColor,
    fontWeight: "600"
  },
  switchText: {},
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "#fafafa"
  },
  startButton: {
    paddingTop: 20
  }
});

export { Auth };

const UPDATE_FORM = "UPDATE_FORM";
const initialFormState = {
  inputValues: {
    email: "",
    password: ""
  },
  inputValidities: {
    email: false,
    password: false
  },
  formValidity: false
};

function formReducer(state, action) {
  switch (action.type) {
    case UPDATE_FORM:
      const updatedInputValues = {
        ...state.inputValues,
        [action.id]: action.value
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.id]: action.isValid
      };

      let updatedFormIsValid = true;
      for (const key in updatedInputValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
      }

      return {
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formValidity: updatedFormIsValid
      };

    default:
      return state;
  }
}
