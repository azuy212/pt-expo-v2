import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import CourseService from '../../services/course';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Course';
/******************************************************************************/

interface IState {
  sClass: string;
  sSubject: string;
  sType: string;
}

type StateKeys = keyof IState;

export default class CourseSelection extends Component<NavigationScreenProps, IState> {
  state = {
    sClass: '',
    sSubject: '',
    sType: '',
  };

  private courseService: CourseService;

  constructor(props: NavigationScreenProps) {
    super(props);

    this.courseService = new CourseService();
  }

  onSelectionChange(key: StateKeys, value: string) {
    this.setState({
      [key]: value,
    } as Pick<IState, StateKeys>);
  }

  nextButtonPressed = () => {
    const { sClass, sSubject, sType } = this.state;

    if (sClass === '') {
      return showErrorAlert('Select all fields', 'Please select Class');
    }
    if (sSubject === '') {
      return showErrorAlert('Select all fields', 'Please select Subject');
    }
    if (sType === '') {
      return showErrorAlert('Select all fields', 'Please select Lecture/Questions');
    }

    if (sType === 'lectures') {
      this.props.navigation.navigate('LectureSelection', { sClass, sSubject });
    } else {
      showErrorAlert('Not Implemented', 'Questions are not yet implemented');
    }
  }

  render() {
    const { sClass, sSubject, sType } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Course</Text>
        <Content contentContainerStyle={styles.container}>
          <Dropdown
            sValue={sClass}
            list={this.courseService.getClasses()}
            onValueChange={itemValue => this.onSelectionChange('sClass', itemValue)}
          />
          <Dropdown
            sValue={sSubject}
            list={this.courseService.getSubjects(sClass)}
            onValueChange={itemValue => this.onSelectionChange('sSubject', itemValue)}
          />
          <Dropdown
            sValue={sType}
            list={this.courseService.getTypes()}
            onValueChange={itemValue => this.onSelectionChange('sType', itemValue)}
          />
          <Button onPress={this.nextButtonPressed} style={{ alignSelf: 'center', marginTop: 10 }}>
            <Text>Next</Text>
          </Button>
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
