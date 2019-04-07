import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import HeaderComponent from '../../components/HeaderComponent';
import { Container, Content } from 'native-base';
import CourseSelection from './CourseSelection';

export default class HomeScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <Container>
        <HeaderComponent {...this.props} title='Home' />
        <Text style={styles.textStyle}>Select Course</Text>
        <Content contentContainerStyle={styles.container}>
          <CourseSelection {...this.props} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
});
