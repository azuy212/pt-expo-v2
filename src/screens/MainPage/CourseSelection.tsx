import React, { Component } from 'react';
import Dropdown from '../../components/Dropdown';
import CourseService from '../../services/course';
import { getClassSubjectKey } from '../../services/common';
import { Button, Text } from 'native-base';
import { showErrorAlert } from '../../services/error';
import { NavigationScreenProps } from 'react-navigation';

const courseService = new CourseService();

interface IState {
  selectedClass: string;
  selectedSubject: string;
  selectedType: string;
}

export default class CourseSelection extends Component<NavigationScreenProps, IState> {
  state = {
    selectedClass: '',
    selectedSubject: '',
    selectedType: '',
  };
  onClassChange = (itemValue: any) => {
    this.setState({ selectedClass: itemValue });
  }
  onSubjectChange = (itemValue: any) => {
    this.setState({ selectedSubject: itemValue });
  }
  onTypeSelection = (itemValue: any) => {
    this.setState({ selectedType: itemValue });
  }
  nextButtonPressed = () => {
    if (this.state.selectedClass === '') {
      return showErrorAlert('Select all fields', 'Please select class');
    }
    if (this.state.selectedSubject === '') {
      return showErrorAlert('Select all fields', 'Please select subject');
    }
    if (this.state.selectedType === '') {
      return showErrorAlert('Select all fields', 'Please select Lecture/Questions');
    }
    const courseKey = getClassSubjectKey(this.state.selectedClass, this.state.selectedSubject);
    this.props.navigation.navigate('LectureSelection', { courseKey });
  }
  render() {
    return (
      <>
        <Dropdown
          selectedValue={this.state.selectedClass}
          list={courseService.getClasses()}
          onValueChange={this.onClassChange}
        />
        <Dropdown
          selectedValue={this.state.selectedSubject}
          list={courseService.getSubjects(this.state.selectedClass)}
          onValueChange={this.onSubjectChange}
        />
        <Dropdown
          selectedValue={this.state.selectedType}
          list={courseService.getTypes()}
          onValueChange={this.onTypeSelection}
        />
        <Button
          onPress={this.nextButtonPressed}
          style={{ alignSelf: 'center', marginTop: 10 }}
        >
          <Text>Next</Text>
        </Button>
      </>
    );
  }
}
