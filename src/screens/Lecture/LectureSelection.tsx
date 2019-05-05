import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import LectureService from '../../services/lecture';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

import logo from '../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../theme/image';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Lecture';
/******************************************************************************/

interface IState {
  sTitle: string;
  sSection: string;
  sSubsection: string;
}

type StateKeys = keyof IState;

export default class LectureSelection extends Component<NavigationScreenProps, IState> {
  state = {
    sTitle: '',
    sSection: '',
    sSubsection: '',
  };

  private lectureService!: LectureService;

  constructor(props: NavigationScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params && params.sClass && params.sSubject) {
      this.lectureService = new LectureService(params.sClass, params.sSubject);
    } else {
      showErrorAlert(
        'Class or Subject not found',
        'No Class or Subject is selected, Please select them first',
      );
      this.props.navigation.navigate('Home');
    }
  }

  onSelectionChange(key: StateKeys, value: string) {
    this.setState({
      [key]: value,
    } as Pick<IState, StateKeys>);
  }

  nextButtonPressed = () => {
    const { sClass, sSubject } = this.props.navigation.state.params!;
    const { sTitle, sSection, sSubsection } = this.state;

    if (sTitle === '') {
      return showErrorAlert('Select all fields', 'Please select Title of Lecture');
    }
    if (sSection === '') {
      return showErrorAlert('Select all fields', 'Please select Section of Title');
    }

    this.props.navigation.navigate('LectureDetail', {
      sClass,
      sSubject,
      sTitle,
      sSection,
      sSubsection,
    });
  }

  render() {
    const { sTitle, sSection, sSubsection } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Lecture</Text>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Image style={SCREEN_IMAGE_LOGO} source={logo} />
          <Dropdown
            sValue={sTitle}
            list={this.lectureService.getTitles()}
            onValueChange={itemValue => this.onSelectionChange('sTitle', itemValue)}
          />
          <Dropdown
            sValue={sSection}
            list={this.lectureService.getSections(sTitle)}
            onValueChange={itemValue => this.onSelectionChange('sSection', itemValue)}
          />
          <Dropdown
            sValue={sSubsection}
            list={this.lectureService.getSubsections(sTitle, sSection)}
            onValueChange={itemValue => this.onSelectionChange('sSubsection', itemValue)}
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
    marginTop: 10,
  },
});
