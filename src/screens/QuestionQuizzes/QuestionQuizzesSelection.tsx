import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import QuestionService from '../../services/question';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

import logo from '../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../theme/image';

/******************************** Screen Header /********************************/
const SCREEN_TITLE = 'Question and Quizzes';
/******************************************************************************/

interface IState {
  sChapter: string;
  sType: string;
}

type StateKeys = keyof IState;

export default class QuestionQuizzesSelection extends Component<NavigationScreenProps, IState> {
  state = {
    sChapter: '',
    sType: '',
  };

  private questionService!: QuestionService;

  constructor(props: NavigationScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params && params.sClass && params.sSubject) {
      this.questionService = new QuestionService(params.sClass, params.sSubject);
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
    const { sChapter, sType } = this.state;

    if (sChapter === '') {
      return showErrorAlert('Select all fields', 'Please select Chapter');
    }
    if (sType === '') {
      return showErrorAlert('Select all fields', 'Please select Question/Quizzes');
    }

    const target = sType === 'questions' ? 'QuestionSelection' : 'QuizDetail';
    this.props.navigation.navigate(target, {
      sClass,
      sSubject,
      sChapter,
    });
  }

  render() {
    const { sChapter, sType } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Question</Text>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Image style={SCREEN_IMAGE_LOGO} source={logo} />
          <Dropdown
            sValue={sChapter}
            list={this.questionService.getChapters()}
            onValueChange={itemValue => this.onSelectionChange('sChapter', itemValue)}
          />
          <Dropdown
            sValue={sType}
            list={this.questionService.getTypes()}
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
    marginTop: 10,
  },
});
