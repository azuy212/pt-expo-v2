import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { createDrawerNavigator, NavigationScreenProps, createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChatScreen from '../Common/ChatScreen';
import ProfileScreen from '../Common/ProfileScreen';
import SettingsScreen from '../Common/SettingsScreen';
import LectureSelection from '../Lecture/LectureSelection';
import CourseSelection from '../Course/CourseSelection';
import SideBar from '../../components/SideBar';
import LectureDetail from '../Lecture/LectureDetail';
import LectureVideo from '../Lecture/LectureVideo';

const ScreenNavigators = createStackNavigator(
  {
    Home: { screen: CourseSelection },
    Chat: { screen: ChatScreen },
    Profile: { screen: ProfileScreen },
    Settings: { screen: SettingsScreen },
    CourseSelection: { screen: CourseSelection },
    LectureSelection: { screen: LectureSelection },
    LectureDetail: { screen: LectureDetail },
    LectureVideo: { screen: LectureVideo },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerTransparent: true,
    },
  },
);

const HomeScreenRouter = createDrawerNavigator(
  {
    Main: { screen: ScreenNavigators },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default HomeScreenRouter;
