import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { createDrawerNavigator, NavigationScreenProps } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChatScreen from '../Common/ChatScreen';
import ProfileScreen from '../Common/ProfileScreen';
import SettingsScreen from '../Common/SettingsScreen';
import LectureSelection from '../Lecture/LectureSelection';
import CourseSelection from '../Course/CourseSelection';
import SideBar from '../../components/SideBar';

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
    Profile: { screen: ProfileScreen },
    Settings: { screen: SettingsScreen },
    CourseSelection: { screen: CourseSelection },
    LectureSelection: { screen: LectureSelection },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default HomeScreenRouter;
