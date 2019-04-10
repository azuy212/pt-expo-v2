import React, { Component } from 'react';
import Dropdown from '../../components/Dropdown';
import CourseService from '../../services/course';
import { Button, Text } from 'native-base';
import { showErrorAlert } from '../../services/error';
import { NavigationScreenProps } from 'react-navigation';

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
      return showErrorAlert('Select all fields', 'Please select class');
    }
    if (selectedSubject === '') {
      return showErrorAlert('Select all fields', 'Please select subject');
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
    return (
      <>
        <Dropdown
          selectedValue={this.state.selectedClass}
          list={this.courseService.getClasses()}
          onValueChange={itemValue => this.onSelectionChange('selectedClass', itemValue)}
        />
        <Dropdown
          selectedValue={this.state.selectedSubject}
          list={this.courseService.getSubjects(this.state.selectedClass)}
          onValueChange={itemValue => this.onSelectionChange('selectedSubject', itemValue)}
        />
        <Dropdown
          selectedValue={this.state.selectedType}
          list={this.courseService.getTypes()}
          onValueChange={itemValue => this.onSelectionChange('selectedType', itemValue)}
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
