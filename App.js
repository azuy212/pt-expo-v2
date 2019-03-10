import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { 
  createSwitchNavigator, 
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator } from 'react-navigation'

import { Icon } from 'native-base'

// UserManagement
import {
  AuthLoadingScreen,
  ForgetPasswordScreen,
  SignInScreen,
  SignUpScreen
} from './src/screens/UserManagement'

import HomeScreen from './src/screens/HomeScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import ProfileScreen from './src/screens/ProfileScreen'

// Amplify imports and config
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

const { height } = Dimensions.get('window');

// Configurations and options for the AppTabNavigator
const configurations = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{fontSize: 26, color: tintColor}} />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-person" style={{fontSize: 26, color: tintColor}} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" style={{fontSize: 26, color: tintColor}} />
      )
    }
  },
}

const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#a8abaf',
    style: {
      backgroundColor: '#667292',
      borderTopWidth: 1,
      borderTopColor: '#ff99',//'#667292',
      paddingBottom: 0,
      height: height / 10
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop:12,
    },
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
  }
}

// Bottom App tabs
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options)

// Making the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  return {
    headerTitle,
  }
}

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Icon name='md-menu' size={24}/>
          </View>
        </TouchableOpacity>
      )
    })
  }
})

// App stack
const AppDrawerNavigator = createDrawerNavigator(
  {
    Tabs: AppStackNavigator,
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen
  },
)

// Auth stack
const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
    }),
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `App`,
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
}, {
  headerLayoutPreset: 'center'
})

export default createSwitchNavigator({
  Authloading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
})