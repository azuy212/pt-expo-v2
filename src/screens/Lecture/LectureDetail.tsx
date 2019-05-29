import React, { Component } from 'react';
import { StyleSheet, NativeSyntheticEvent, WebViewMessageEventData } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Content, View, H1 } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import LectureService, { FilesBaseUrl } from '../../services/lecture';
import { showErrorAlert } from '../../services/error';
import { convertToTitleCase } from '../../services/common';
import WebViewFlex from '../../components/WebViewFlex';

import logo from '../../images/logo.png';

interface IState {
  filePath: string;
  videoPath: string;
  sTitle: string;
  error?: boolean;
}

export default class LectureDetail extends Component<NavigationScreenProps, IState> {
  state = {
    filePath: '',
    videoPath: '',
    sTitle: 'Lecture Detail',
    error: false,
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

  componentDidMount() {
    const params = this.props.navigation.state.params;
    if (params) {
      const { sTitle, sSection, sSubsection } = params;
      const lectureDetails = this.lectureService.getLectureDetail(sTitle, sSection, sSubsection);
      if (lectureDetails) {
        const filesPath = this.lectureService.createFilePath(
          lectureDetails.course,
          lectureDetails.id_file,
          lectureDetails.chapter,
          lectureDetails.file_name,
          lectureDetails.lecture_video,
        );
        this.setState({ ...filesPath, sTitle: convertToTitleCase(sSubsection || sSection) });
      }
    }
  }

  handleError = (event: NativeSyntheticEvent<WebViewMessageEventData>) => {
    const message = event.nativeEvent.data;
    const regex = /<Code>AccessDenied<\/Code>/;
    const error = regex.test(message);
    this.setState({ error });
  }

  videoIconPress = () => {
    this.props.navigation.navigate('LectureVideo', {
      videoUrl: `${FilesBaseUrl}/${this.state.videoPath}`,
      sTitle: this.state.sTitle,
    });
  }

  render() {
    const { error, filePath } = this.state;
    return (
      <Container>
        <HeaderComponent
          {...this.props}
          title={this.state.sTitle}
          isVideoAvailable={true}
          videoIconPress={this.videoIconPress}
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
    marginTop: 10,
  },
  webView: {
    flex: 8,
  },
  error: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
