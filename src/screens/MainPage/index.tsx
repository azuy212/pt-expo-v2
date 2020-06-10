import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ChatScreen from '../Common/ChatScreen';
import ProfileScreen from '../Common/ProfileScreen';
import SettingsScreen from '../Common/SettingsScreen';
import LectureSelection from '../Lecture/LectureSelection';
import CourseSelection from '../Course/CourseSelection';
import SideBar from '../../components/SideBar';
import LectureDetail from '../Lecture/LectureDetail';
import LectureVideo from '../Lecture/LectureVideo';
import QuestionQuizzesSelection from '../QuestionQuizzes/QuestionQuizzesSelection';
import QuestionDetail from '../QuestionQuizzes/Question/QuestionDetail';
import QuestionSelection from '../QuestionQuizzes/Question/QuestionSelection';
import QuizDetail from '../QuestionQuizzes/Quizzes/QuizDetail';
import QuizComplete from '../QuestionQuizzes/Quizzes/QuizComplete';

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
    QuestionQuizzesSelection: { screen: QuestionQuizzesSelection },
    QuestionSelection: { screen: QuestionSelection },
    QuestionDetail: { screen: QuestionDetail },
    QuizDetail: { screen: QuizDetail },
    QuizComplete: { screen: QuizComplete },
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
