import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../../components/Dropdown';
import QuestionService from '../../../services/question';
import HeaderComponent from '../../../components/HeaderComponent';
import { showErrorAlert } from '../../../services/error';

import logo from '../../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../../theme/image';
import { IDropDownOptions } from '../../../models/dropdown';
import Loading from '../../../components/Loading';

/******************************** Screen Header /********************************/
const SCREEN_TITLE = 'Question';
/******************************************************************************/

interface IState {
  loading: boolean;
  questions: IDropDownOptions;
  sQuestion: string;
}

type StateKeys = keyof IState;

export default class QuestionSelection extends Component<NavigationStackScreenProps, IState> {
  state = {
    loading: true,
    questions: [{ label: 'Select Question', value: '' }],
    sQuestion: '',
  };

  private questionService!: QuestionService;

  constructor(props: NavigationStackScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params && params.sClass && params.sSubject && params.sChapter) {
      this.questionService = new QuestionService(
        params.sClass,
        params.sSubject,
      );
    } else {
      showErrorAlert(
        'Class or Subject not found',
        'No Class or Subject is selected, Please select them first',
      );
      this.props.navigation.navigate('Home');
    }
  }

  async componentDidMount() {
    await this.questionService.init();
    const { sChapter } = this.props.navigation.state.params!;
    this.setState({
      loading: false,
      questions: this.questionService.getQuestions(sChapter),
    });
  }

  generateQuestionDetailNavigationParams(sChapter: string, sQuestion: string) {
    const questionDetails = this.questionService.getQuestionDetail(
      sChapter,
      sQuestion,
    );
    if (questionDetails) {
      const { filePath, videoPath } = this.questionService.createFilePath(
        questionDetails.course,
        questionDetails.chapter,
        questionDetails.lecture_link,
        questionDetails.lecture_video,
      );
      return {
        filePath,
        videoPath,
        sQuestion,
        error: false,
      };
    }
    return {
      error: true,
    };
  }

  nextButtonPressed = () => {
    const { sChapter } = this.props.navigation.state.params!;
    const { sQuestion } = this.state;

    if (sQuestion === '') {
      return showErrorAlert('Select all fields', 'Please select Question');
    }

    this.props.navigation.navigate(
      'QuestionDetail',
      this.generateQuestionDetailNavigationParams(sChapter, sQuestion),
    );
  }

  render() {
    const { loading, questions, sQuestion } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Question</Text>
        {loading ? (
          <Loading />
        ) : (
          <Content contentContainerStyle={styles.container}>
            {/* <Image style={SCREEN_IMAGE_LOGO} source={logo} /> */}
            <Dropdown
              sValue={sQuestion}
              list={questions}
              onValueChange={itemValue => this.setState({ sQuestion: itemValue })}
            />
            <Button
              onPress={this.nextButtonPressed}
              style={{ alignSelf: 'center', marginTop: 10 }}
            >
              <Text>Next</Text>
            </Button>
          </Content>
        )}
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
