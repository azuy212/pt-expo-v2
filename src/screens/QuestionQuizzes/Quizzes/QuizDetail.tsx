import React, { Component } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  NativeSyntheticEvent,
  WebViewMessageEventData,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import QuizService, { FilesBaseUrl } from '../../../services/quiz';
import { showErrorAlert } from '../../../services/error';
import { IQuiz } from '../../../models/quiz';
import { Container, Content, Root, Toast, Text, View, H1 } from 'native-base';
import HeaderComponent from '../../../components/HeaderComponent';
import WebViewFlex from '../../../components/WebViewFlex';
import QuizAnswerButtons from '../../../components/QuizAnswerButtons';

interface IState {
  quizzes: IQuiz[];
  filePath: string;
  totalQuizzes: number;
  currentQuizNumber: number;
  correctAnswers: number;
  error?: boolean;
}

export default class QuizDetail extends Component<NavigationScreenProps, IState> {
  state = {
    quizzes: [],
    filePath: '',
    totalQuizzes: 0,
    currentQuizNumber: -1,
    correctAnswers: 0,
    error: false,
  } as IState;

  private quizService!: QuizService;

  constructor(props: NavigationScreenProps) {
    super(props);

    const { params } = props.navigation.state;
    if (params && params.sClass && params.sSubject && params.sChapter) {
      this.quizService = new QuizService(params.sClass, params.sSubject);
    } else {
      showErrorAlert(
        'Class or Subject not found',
        'No Class or Subject is selected, Please select them first',
      );
      this.props.navigation.navigate('Home');
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      const { sChapter } = params;
      if (sChapter) {
        const quizzes = this.quizService.getQuizzes(sChapter);
        if (quizzes.length > 0) {
          this.setState({ quizzes, totalQuizzes: quizzes.length }, this.loadNextQuestion);
        } else {
          ToastAndroid.show('No Quiz found for this chapter', ToastAndroid.SHORT);
          this.props.navigation.goBack();
        }
      }
    }
  }

  loadNextQuestion = () => {
    const { currentQuizNumber, quizzes } = this.state;
    if (quizzes.length > 0) {
      const nextQuiz = quizzes[currentQuizNumber + 1];
      const quizDetail = this.quizService.getQuizDetail(nextQuiz.id_quizzes.toString());
      if (quizDetail) {
        const filePath = this.quizService.createFilePath(
          quizDetail.course,
          quizDetail.file_name,
          quizDetail.quiz_link,
        );
        this.setState({
          filePath,
          currentQuizNumber: currentQuizNumber + 1,
        });
      }
    }
  }

  buttonListener = (answer: string) => {
    const { currentQuizNumber, totalQuizzes, quizzes, correctAnswers } = this.state;
    const currentQuiz = quizzes[currentQuizNumber];
    if (answer === currentQuiz.answer) {
      this.setState({ correctAnswers: correctAnswers + 1 });
      Toast.show({ text: 'Correct Answer!', type: 'success' });
    } else {
      console.log('ans:', currentQuiz.answer, currentQuiz.det_answer);
      Toast.show({ text: 'Wrong Answer!', type: 'danger' });
    }
    if (currentQuizNumber + 1 !== totalQuizzes) {
      this.loadNextQuestion();
    } else {
      console.log('Correct Answers:', correctAnswers);
      this.props.navigation.navigate('QuizComplete', {
        correctAnswers,
        totalQuizzes,
      });
    }
  }

  handleError = (event: NativeSyntheticEvent<WebViewMessageEventData>) => {
    const message = event.nativeEvent.data;
    const regex = /<Code>AccessDenied<\/Code>/;
    const error = regex.test(message);
    this.setState({ error });
  }

  render() {
    const { currentQuizNumber, totalQuizzes, filePath, error } = this.state;
    return (
      <Root>
        <Container>
          <HeaderComponent
            {...this.props}
            title={`Quiz ${currentQuizNumber + 1} of ${totalQuizzes}`}
          />
          <Content contentContainerStyle={{ flex: 1 }}>
            {error ? (
              <View style={styles.error}>
                <H1>No Data Found!</H1>
              </View>
            ) : (
              <WebViewFlex
                style={styles.webView}
                url={`${FilesBaseUrl}/${filePath}`}
                onMessage={this.handleError}
              />
            )}
            <QuizAnswerButtons style={styles.buttons} buttonListener={this.buttonListener} />
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 5,
    padding: 15,
  },
  error: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 4,
  },
});
