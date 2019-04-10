import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Home';
/******************************************************************************/

export default class HomeScreen extends Component<NavigationScreenProps> {
  componentDidMount() {
    this.props.navigation.navigate('CourseSelection');
  }
  render() {
    return (
      <></>
    );
  }
}
