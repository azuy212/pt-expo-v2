import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import QuestionService from '../../services/question';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

import logo from '../../images/logo.png';

/******************************** Screen Chapter /********************************/
const SCREEN_TITLE = 'Question';
/******************************************************************************/

interface IState {
  sChapter: string;
  sQuestion: string;
  sType: string;
}

type StateKeys = keyof IState;

export default class QuestionSelection extends Component<NavigationScreenProps, IState> {
  state = {
    sChapter: '',
    sQuestion: '',
    sType: '',
  };

  private questionService!: QuestionService;

  constructor(props: NavigationScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params && params.sClass && params.sSubject) {
      this.questionService = new QuestionService(params.sClass, params.sSubject);
    } else {
      showErrorAlert('Class or Subject not found', 'No Class or Subject is s, Please s them first');
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
    const { sChapter, sQuestion, sType } = this.state;

    if (sChapter === '') {
      return showErrorAlert('Select all fields', 'Please select Chapter');
    }
    if (sQuestion === '') {
      return showErrorAlert('Select all fields', 'Please select Question');
    }
    if (sType === '') {
      return showErrorAlert('Select all fields', 'Please select Question/Quizzes');
    }

    if (sType === 'questions') {
      this.props.navigation.navigate('QuestionDetail', {
        sClass,
        sSubject,
        sChapter,
        sQuestion,
        sType,
      });
    } else {
      showErrorAlert('Not Implemented', 'Quizzes are not yet implemented');
    }
  }

  render() {
    const { sChapter, sQuestion, sType } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Question</Text>
        <Content contentContainerStyle={{ flex: 1 }}>
          <ImageBackground
            source={logo}
            style={styles.container}
            imageStyle={styles.imageBackgroundImage}
          >
            <Dropdown
              sValue={sChapter}
              list={this.questionService.getChapters()}
              onValueChange={itemValue => this.onSelectionChange('sChapter', itemValue)}
            />
            <Dropdown
              sValue={sQuestion}
              list={this.questionService.getQuestions(sChapter)}
              onValueChange={itemValue => this.onSelectionChange('sQuestion', itemValue)}
            />
            <Dropdown
              sValue={sType}
              list={this.questionService.getTypes()}
              onValueChange={itemValue => this.onSelectionChange('sType', itemValue)}
            />
            <Button onPress={this.nextButtonPressed} style={{ alignSelf: 'center', marginTop: 10 }}>
              <Text>Next</Text>
            </Button>
          </ImageBackground>
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
  imageBackgroundImage: {
    opacity: 0.5,
    resizeMode: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
});
