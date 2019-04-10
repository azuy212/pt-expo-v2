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
  selectedClass: string;
  selectedSubject: string;
  selectedType: string;
}

type StateKeys = keyof IState;

export default class CourseSelection extends Component<NavigationScreenProps, IState> {
  state = {
    selectedClass: '',
    selectedSubject: '',
    selectedType: '',
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
    const { selectedClass, selectedSubject, selectedType } = this.state;

    if (selectedClass === '') {
      return showErrorAlert('Select all fields', 'Please select Class');
    }
    if (selectedSubject === '') {
      return showErrorAlert('Select all fields', 'Please select Subject');
    }
    if (selectedType === '') {
      return showErrorAlert('Select all fields', 'Please select Lecture/Questions');
    }

    if (selectedType === 'lectures') {
      this.props.navigation.navigate('LectureSelection', { selectedClass, selectedSubject });
    } else {
      showErrorAlert('Not Implemented', 'Questions are not yet implemented');
    }
  }

  render() {
    const { selectedClass, selectedSubject, selectedType } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Course</Text>
        <Content contentContainerStyle={styles.container}>
          <Dropdown
            selectedValue={selectedClass}
            list={this.courseService.getClasses()}
            onValueChange={itemValue => this.onSelectionChange('selectedClass', itemValue)}
          />
          <Dropdown
            selectedValue={selectedSubject}
            list={this.courseService.getSubjects(selectedClass)}
            onValueChange={itemValue => this.onSelectionChange('selectedSubject', itemValue)}
          />
          <Dropdown
            selectedValue={selectedType}
            list={this.courseService.getTypes()}
            onValueChange={itemValue => this.onSelectionChange('selectedType', itemValue)}
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
