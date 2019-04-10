import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import LectureService from '../../services/lecture';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Lecture';
/******************************************************************************/

interface IState {
  selectedTitle: string;
  selectedSection: string;
  selectedSubsection: string;
}

type StateKeys = keyof IState;

export default class LectureSelection extends Component<NavigationScreenProps, IState> {
  state = {
    selectedTitle: '',
    selectedSection: '',
    selectedSubsection: '',
  };

  private lectureService: LectureService;

  constructor(props: NavigationScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params) {
      this.lectureService = new LectureService(params.selectedClass, params.selectedSubject);
    } else {
      // need to throw error
      this.lectureService = new LectureService('', '');
    }
  }

  onSelectionChange(key: StateKeys, value: string) {
    this.setState({
      [key]: value,
    } as Pick<IState, StateKeys>);
  }

  nextButtonPressed = () => {
    const { selectedTitle, selectedSection, selectedSubsection } = this.state;

    if (selectedTitle === '') {
      return showErrorAlert('Select all fields', 'Please select Title of Lecture');
    }
    if (selectedSection === '') {
      return showErrorAlert('Select all fields', 'Please select Section of Title');
    }
    if (selectedSubsection === '') {
      return showErrorAlert('Select all fields', 'Please select SubSection of Section');
    }
  }

  render() {
    const { selectedTitle, selectedSection, selectedSubsection } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Lecture</Text>
        <Content contentContainerStyle={styles.container}>
          <Dropdown
            selectedValue={selectedTitle}
            list={this.lectureService.getTitles()}
            onValueChange={itemValue => this.onSelectionChange('selectedTitle', itemValue)}
          />
          <Dropdown
            selectedValue={selectedSection}
            list={this.lectureService.getSections(selectedTitle)}
            onValueChange={itemValue => this.onSelectionChange('selectedSection', itemValue)}
          />
          <Dropdown
            selectedValue={selectedSubsection}
            list={this.lectureService.getSubsections(selectedTitle, selectedSection)}
            onValueChange={itemValue => this.onSelectionChange('selectedSubsection', itemValue)}
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
