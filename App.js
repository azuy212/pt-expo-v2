import { createSwitchNavigator } from "react-navigation";

// Auth Loading
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
// UserManagement
import { AuthStackNavigator } from "./src/screens/UserManagement";
// Main Page
import { AppStackNavigator } from './src/screens/MainPage';

// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

export default createSwitchNavigator({
  Authloading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppStackNavigator
});
