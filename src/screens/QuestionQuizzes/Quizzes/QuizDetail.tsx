import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  NativeSyntheticEvent,
  WebViewMessageEventData,
  Image,
} from 'react-native';
import { Container, Content, Root, Toast, View, H1 } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';

import QuizService, { FilesBaseUrl } from '../../../services/quiz';
import { showErrorAlert } from '../../../services/error';
import { IQuiz } from '../../../models/quiz';
import HeaderComponent from '../../../components/HeaderComponent';
import WebViewFlex from '../../../components/WebViewFlex';
import QuizAnswerButtons from '../../../components/QuizAnswerButtons';

import logo from '../../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../../theme/image';
import QuizHeader from '../../../components/QuizHeader';

interface IState {
  quizzes: IQuiz[];
  filePath: string;
  totalQuizzes: number;
  currentQuizNumber: number;
  correctAnswers: number;
  skipped: number;
  error: boolean | null;
  loading: boolean | null;
  startTime: number;
}

type IProps = NavigationScreenProps;

export default class QuizDetail extends PureComponent<IProps, IState> {
  state = {
    quizzes: [],
    filePath: '',
    totalQuizzes: 0,
    currentQuizNumber: -1,
    correctAnswers: 0,
    skipped: 0,
    error: null,
    loading: null,
    startTime: 0,
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

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      const { sChapter } = params;
      if (sChapter) {
        await this.quizService.init();
        const quizzes = this.quizService.getQuizzes(sChapter);
        if (quizzes.length > 0) {
          this.setState(
            { quizzes, totalQuizzes: quizzes.length },
            this.loadNextQuestion,
          );
        } else {
          ToastAndroid.show(
            'No Quiz found for this chapter',
            ToastAndroid.SHORT,
          );
          this.props.navigation.goBack();
        }
      }
    }
  }

  loadNextQuestion = () => {
    const { currentQuizNumber, quizzes, totalQuizzes } = this.state;
    if (currentQuizNumber + 1 !== totalQuizzes) {
      if (quizzes.length > 0) {
        const nextQuiz = quizzes[currentQuizNumber + 1];
        const quizDetail = this.quizService.getQuizDetail(
          nextQuiz.id_quizzes.toString(),
        );
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
    } else {
      const { skipped, startTime, correctAnswers } = this.state;
      const { params } = this.props.navigation.state;
      this.props.navigation.replace('QuizComplete', {
        ...params,
        skipped,
        startTime,
        correct: correctAnswers,
        total: totalQuizzes,
        endTime: Date.now(),
      });
    }
  }

  loadPreviousQuestion = () => {
    const { currentQuizNumber, quizzes } = this.state;
    if (quizzes.length > 0) {
      const nextQuiz = quizzes[currentQuizNumber - 1];
      const quizDetail = this.quizService.getQuizDetail(
        nextQuiz.id_quizzes.toString(),
      );
      if (quizDetail) {
        const filePath = this.quizService.createFilePath(
          quizDetail.course,
          quizDetail.file_name,
          quizDetail.quiz_link,
        );
        this.setState({
          filePath,
          currentQuizNumber: currentQuizNumber - 1,
        });
      }
    }
  }

  showAnswerStatusToast = (status: 'Correct' | 'Wrong' | 'Skipped') => {
    Toast.show({
      text: status,
      duration: 500,
      type:
        status === 'Correct'
          ? 'success'
          : status === 'Wrong'
          ? 'danger'
          : 'warning',
      onClose: this.loadNextQuestion,
    });
  }

  answersButtonListener = (answer: string) => {
    const { currentQuizNumber, quizzes, correctAnswers } = this.state;
    const currentQuiz = quizzes[currentQuizNumber];
    if (answer === currentQuiz.answer) {
      this.setState({ correctAnswers: correctAnswers + 1 }, () =>
        this.showAnswerStatusToast('Correct'),
      );
    } else {
      console.log('ans:', currentQuiz.answer, currentQuiz.det_answer);
      this.showAnswerStatusToast('Wrong');
    }
  }

  handleError = (event: NativeSyntheticEvent<WebViewMessageEventData>) => {
    const message = event.nativeEvent.data;
    const regex = /<Code>AccessDenied<\/Code>/;
    const error = regex.test(message);
    if (error !== this.state.error) {
      this.setState({ error });
      if (!error) {
        this.setState({ startTime: Date.now() });
      }
    }
  }

  handleLoading = (isLoading: boolean) => {
    const { loading } = this.state;
    if (loading === null && isLoading !== loading) {
      this.setState({ loading: isLoading });
    }
  }

  handleBackPress = () => {
    if (this.state.currentQuizNumber > 0) {
      this.loadPreviousQuestion();
    }
  }

  handleSkipPress = () => {
    const { skipped } = this.state;
    this.setState({ skipped: skipped + 1 }, () =>
      this.showAnswerStatusToast('Skipped'),
    );
  }

  renderQuizHeader = () => {
    const { currentQuizNumber, totalQuizzes, error } = this.state;
    return error === false ? (
      <QuizHeader
        title={`Quiz ${currentQuizNumber + 1} of ${totalQuizzes}`}
        style={{ flex: 0.1 }}
        onBackPress={this.handleBackPress}
        onForwardPress={this.handleSkipPress}
      />
    ) : null;
  }

  renderWebViewOrNoData = () => {
    const { error, filePath } = this.state;
    return error ? (
      <View style={styles.error}>
        <H1>No Data Found!</H1>
      </View>
    ) : filePath ? (
      <WebViewFlex
        style={styles.webView}
        url={`${FilesBaseUrl}/${this.state.filePath}`}
        onMessage={this.handleError}
      />
    ) : null;
  }

  renderQuizAnswerButton = () => {
    return this.state.error === false ? (
      <QuizAnswerButtons
        style={styles.buttons}
        buttonListener={this.answersButtonListener}
      />
    ) : null;
  }

  render() {
    return (
      <Root>
        <Container>
          <HeaderComponent {...this.props} />
          {this.renderQuizHeader()}
          <Content contentContainerStyle={styles.container}>
            {this.renderWebViewOrNoData()}
            <Image
              style={[SCREEN_IMAGE_LOGO, { flex: 3, opacity: 0.2 }]}
              source={logo}
            />
            {this.renderQuizAnswerButton()}
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
  quizHeader: {
    flex: 1,
  },
  webView: {
    flex: 5,
  },
  error: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 5,
  },
});
