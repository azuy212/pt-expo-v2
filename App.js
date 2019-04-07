import { createSwitchNavigator } from "react-navigation";

// Auth Loading
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
// UserManagement
import { AuthStackNavigator } from "./src/screens/UserManagement";
// Main Page
import AppDrawerNavigator from './src/screens/MainPage';

// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});
