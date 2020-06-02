import React, { Component } from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Home';
/******************************************************************************/

export default class HomeScreen extends Component<NavigationStackScreenProps> {
  componentDidMount() {
    this.props.navigation.navigate('CourseSelection');
  }
  render() {
    return (
      <></>
    );
  }
}
