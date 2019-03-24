import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { createDrawerNavigator, NavigationScreenProps } from 'react-navigation';

import ChatScreen from './ChatScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SideBar from './SideBar';
import SettingsScreen from './SettingsScreen';

export default class MainApp extends Component<NavigationScreenProps> {
  state = {
    isReady: false,
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <HomeScreenRouter />;
  }
}

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
