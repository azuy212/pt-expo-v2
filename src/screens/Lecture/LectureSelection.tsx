import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import LectureService from '../../services/lecture';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

import logo from '../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../theme/image';
import { IDropDownOptions } from '../../models/dropdown';
import Loading from '../../components/Loading';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Lecture';
/******************************************************************************/

interface IState {
  loading: boolean;
  titles: IDropDownOptions;
  sTitle: string;
  sections: IDropDownOptions;
  sSection: string;
  subsections: IDropDownOptions;
  sSubsection: string;
}

type StateKeys = 'sTitle' | 'sSection' | 'sSubsection';

export default class LectureSelection extends Component<NavigationStackScreenProps, IState> {
  state = {
    loading: true,
    titles: [{ label: 'Select Title', value: '' }],
    sTitle: '',
    sections: [{ label: 'Select Section', value: '' }],
    sSection: '',
    subsections: [{ label: 'Select Subsection', value: '' }],
    sSubsection: '',
  };

  private lectureService!: LectureService;

  constructor(props: NavigationStackScreenProps) {
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

  async componentDidMount() {
    await this.lectureService.init();
    this.setState({
      loading: false,
      titles: this.lectureService.getTitles(),
    });
  }

  onSelectionChange(key: StateKeys, value: string) {
    switch (key) {
      case 'sTitle':
        this.setState({
          sTitle: value,
          sections: this.lectureService.getSections(value),
        });
        break;
      case 'sSection':
        this.setState({
          sSection: value,
          subsections: this.lectureService.getSubsections(
            this.state.sTitle,
            value,
          ),
        });
        break;
      case 'sSubsection':
        this.setState({ sSubsection: value });
        break;
      default:
        break;
    }
  }

  generateLectureDetailNavigationParams(
    sTitle: string,
    sSection: string,
    sSubsection: string,
  ) {
    const lectureDetails = this.lectureService.getLectureDetail(
      sTitle,
      sSection,
      sSubsection,
    );
    if (lectureDetails) {
      const { filePath, videoPath } = this.lectureService.createFilePath(
        lectureDetails.course,
        lectureDetails.id_file,
        lectureDetails.chapter,
        lectureDetails.file_name,
        lectureDetails.lecture_video,
      );
      return {
        filePath,
        videoPath,
        sTitle,
        error: false,
      };
    }
    return {
      error: true,
    };
  }

  nextButtonPressed = () => {
    const { sTitle, sSection, sSubsection } = this.state;

    if (sTitle === '') {
      return showErrorAlert(
        'Select all fields',
        'Please select Title of Lecture',
      );
    }
    if (sSection === '') {
      return showErrorAlert(
        'Select all fields',
        'Please select Section of Title',
      );
    }

    this.props.navigation.navigate(
      'LectureDetail',
      this.generateLectureDetailNavigationParams(sTitle, sSection, sSubsection),
    );
  }

  render() {
    const {
      loading,
      titles,
      sTitle,
      sections,
      sSection,
      subsections,
      sSubsection,
    } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Lecture</Text>
        {loading ? (
          <Loading />
        ) : (
          <Content contentContainerStyle={styles.container}>
            {/* <Image style={SCREEN_IMAGE_LOGO} source={logo} /> */}
            <Dropdown
              sValue={sTitle}
              list={titles}
              onValueChange={itemValue =>
                this.onSelectionChange('sTitle', itemValue)
              }
            />
            <Dropdown
              sValue={sSection}
              list={sections}
              onValueChange={itemValue =>
                this.onSelectionChange('sSection', itemValue)
              }
            />
            <Dropdown
              sValue={sSubsection}
              list={subsections}
              onValueChange={itemValue =>
                this.onSelectionChange('sSubsection', itemValue)
              }
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
    // marginTop: 10,
  },
});
