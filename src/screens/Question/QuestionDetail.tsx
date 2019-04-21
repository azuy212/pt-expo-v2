import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Content } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import QuestionService, { FilesBaseUrl } from '../../services/question';
import { showErrorAlert } from '../../services/error';
import { convertToTitleCase } from '../../services/common';
import WebViewFlex from '../../components/WebViewFlex';

import logo from '../../images/logo.png';

interface IState {
  filePath: string;
  videoPath: string;
  sChapter: string;
}

export default class QuestionDetail extends Component<NavigationScreenProps, IState> {
  state = {
    filePath: '',
    videoPath: '',
    sChapter: 'Question Detail',
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
  componentDidMount() {
    const params = this.props.navigation.state.params;
    if (params) {
      const { sChapter, sQuestion } = params;
      const questionDetails = this.questionService.getQuestionDetail(sChapter, sQuestion);
      if (questionDetails) {
        const filesPath = this.questionService.createFilePath(
          questionDetails.course,
          questionDetails.chapter,
          questionDetails.lecture_link,
          questionDetails.lecture_video,
        );
        this.setState({ ...filesPath, sChapter: convertToTitleCase(sQuestion) });
      }
    }
  }
  videoIconPress = () => {
    this.props.navigation.navigate('QuestionVideo', {
      videoUrl: `${FilesBaseUrl}/${this.state.videoPath}`,
      sChapter: this.state.sChapter,
    });
  }
  render() {
    return (
      <Container>
        <HeaderComponent {...this.props} title={this.state.sChapter} />
        <Content contentContainerStyle={{ flex: 1 }}>
          <ImageBackground
            source={logo}
            style={styles.container}
            imageStyle={styles.imageBackgroundImage}
          >
            <WebViewFlex style={styles.webView} url={`${FilesBaseUrl}/${this.state.filePath}`} />
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
  imageBackgroundImage: {
    opacity: 0.5,
    resizeMode: 'center',
  },
  webView: {
    flex: 8,
  },
});
