import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import QuestionService from '../../services/question';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

import logo from '../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../theme/image';
import { IDropDownOptions } from '../../models/dropdown';
import Loading from '../../components/Loading';

/******************************** Screen Header /********************************/
const SCREEN_TITLE = 'Question and Quizzes';
/******************************************************************************/

interface IState {
  loading: boolean;
  chapters: IDropDownOptions;
  sChapter: string;
  sType: string;
}

type StateKeys = 'sChapter' | 'sType';

export default class QuestionQuizzesSelection extends Component<NavigationStackScreenProps, IState> {
  state = {
    loading: true,
    chapters: [{ label: 'Select Chapter', value: '' }],
    sChapter: '',
    sType: '',
  };

  private questionService!: QuestionService;

  constructor(props: NavigationStackScreenProps) {
    super(props);
    const { params } = props.navigation.state;

    if (params && params.sClass && params.sSubject) {
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
    this.setState({
      loading: false,
      chapters: this.questionService.getChapters(),
    });
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
      return showErrorAlert(
        'Select all fields',
        'Please select Question/Quizzes',
      );
    }

    const target = sType === 'Questions' ? 'QuestionSelection' : 'QuizDetail';
    this.props.navigation.navigate(target, {
      sClass,
      sSubject,
      sChapter,
    });
  }

  render() {
    const { loading, chapters, sChapter, sType } = this.state;
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
              sValue={sChapter}
              list={chapters}
              onValueChange={itemValue =>
                this.onSelectionChange('sChapter', itemValue)
              }
            />
            <Dropdown
              sValue={sType}
              list={this.questionService.getTypes()}
              onValueChange={itemValue =>
                this.onSelectionChange('sType', itemValue)
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
