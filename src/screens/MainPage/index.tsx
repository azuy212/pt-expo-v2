import React from 'react';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

import { Dimensions, Image } from 'react-native';
import { Icon } from 'native-base';

import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  TabNavigatorConfig,
} from 'react-navigation';

const { height } = Dimensions.get('window');

// Configurations and options for the AppTabNavigator
const configurations = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }: {tintColor: string}) => (
        <Icon name='ios-home' style={{ fontSize: 26, color: tintColor }} />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }: {tintColor: string}) => (
        <Icon name='ios-person' style={{ fontSize: 26, color: tintColor }} />
      ),
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }: {tintColor: string}) => (
        <Icon name='ios-settings' style={{ fontSize: 26, color: tintColor }} />
      ),
    },
  },
};

const options: TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#a8abaf',
    style: {
      backgroundColor: '#667292',
      height: height / 12,
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 2,
    },
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
  },
};

// Bottom App tabs
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options);

// Making the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }: {navigation: any}) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle,
  };
};

export const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
  },
});
