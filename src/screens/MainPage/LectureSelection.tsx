import React, { Component } from 'react';
import Dropdown from '../../components/Dropdown';
import LectureService from '../../services/lecture';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Text, Content } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import { StyleSheet } from 'react-native';

const lectureService = new LectureService();

interface IState {
  selectedTitle: string;
  selectedSection: string;
  selectedSubsection: string;
}

export default class LectureSelection extends Component<NavigationScreenProps, IState> {
  state = {
    selectedTitle: '',
    selectedSection: '',
    selectedSubsection: '',
  };

  onClassChange = (itemValue: any) => {
    this.setState({ selectedTitle: itemValue });
  }
  onSubjectChange = (itemValue: any) => {
    this.setState({ selectedSection: itemValue });
  }
  onTypeSelection = (itemValue: any) => {
    this.setState({ selectedSubsection: itemValue });
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title='Home' />
        <Text style={styles.textStyle}>Select Lecture</Text>
        <Content contentContainerStyle={styles.container}>
        <Dropdown
          selectedValue={this.state.selectedTitle}
          list={lectureService.getTitles(params && params.courseKey)}
          onValueChange={this.onClassChange}
        />
        <Dropdown
          selectedValue={this.state.selectedSection}
          list={lectureService.getSections(this.state.selectedTitle)}
          onValueChange={this.onSubjectChange}
        />
        <Dropdown
          selectedValue={this.state.selectedSubsection}
          list={lectureService.getSubsections(this.state.selectedSection)}
          onValueChange={this.onTypeSelection}
        />
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
