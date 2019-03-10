import WelcomeScreen from './WelcomeScreen';
import ForgetPasswordScreen from "./ForgetPasswordScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

import { createStackNavigator } from 'react-navigation';

// Auth stack
export const AuthStackNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        title: `Log in to your account`
      })
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: () => ({
        title: `App`,
        headerBackTitle: "Back"
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: `Create a new account`
      })
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: () => ({
        title: `Create a new password`
      })
    }
  },
  {
    headerLayoutPreset: "center"
  }
);
