import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Content } from 'native-base';
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
}

export default class LectureDetail extends Component<NavigationScreenProps, IState> {
  state = {
    filePath: '',
    videoPath: '',
    sTitle: 'Lecture Detail',
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
  videoIconPress = () => {
    this.props.navigation.navigate('LectureVideo', {
      videoUrl: `${FilesBaseUrl}/${this.state.videoPath}`,
      sTitle: this.state.sTitle,
    });
  }
  render() {
    return (
      <Container>
        <HeaderComponent
          {...this.props}
          title={this.state.sTitle}
          isVideoAvailable={true}
          videoIconPress={this.videoIconPress}
        />
        <Content contentContainerStyle={{ flex: 1 }}>
          <WebViewFlex style={styles.webView} url={`${FilesBaseUrl}/${this.state.filePath}`} />
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
});
