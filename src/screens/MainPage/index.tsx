import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { createDrawerNavigator, NavigationScreenProps } from 'react-navigation';

import ChatScreen from './ChatScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SideBar from './SideBar';
import SettingsScreen from './SettingsScreen';

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
    Profile: { screen: ProfileScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default HomeScreenRouter;
