import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../../components/Dropdown';
import QuestionService from '../../../services/question';
import HeaderComponent from '../../../components/HeaderComponent';
import { showErrorAlert } from '../../../services/error';

import logo from '../../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../../theme/image';

/******************************** Screen Header /********************************/
const SCREEN_TITLE = 'Question';
/******************************************************************************/

interface IState {
  sQuestion: string;
}

type StateKeys = keyof IState;

export default class QuestionSelection extends Component<NavigationScreenProps, IState> {
  state = {
    sQuestion: '',
  };

  private questionService!: QuestionService;

  constructor(props: NavigationScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params && params.sClass && params.sSubject && params.sChapter) {
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
    const { sClass, sSubject, sChapter } = this.props.navigation.state.params!;
    const { sQuestion } = this.state;

    if (sQuestion === '') {
      return showErrorAlert('Select all fields', 'Please select Question');
    }

    this.props.navigation.navigate('QuestionDetail', {
      sClass,
      sSubject,
      sChapter,
      sQuestion,
    });
  }

  render() {
    const { sQuestion } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Question</Text>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Image style={SCREEN_IMAGE_LOGO} source={logo} />
          <Dropdown
            sValue={sQuestion}
            list={this.questionService.getQuestions(params!.sChapter)}
            onValueChange={itemValue => this.onSelectionChange('sQuestion', itemValue)}
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
