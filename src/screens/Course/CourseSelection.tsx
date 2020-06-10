import React, { Component } from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Button, Container, Content, Text } from 'native-base';

import Dropdown from '../../components/Dropdown';
import CourseService from '../../services/course';
import HeaderComponent from '../../components/HeaderComponent';
import { showErrorAlert } from '../../services/error';

import { IDropDownOptions } from '../../models/dropdown';
import Loading from '../../components/Loading';

YellowBox.ignoreWarnings([
  'VirtualizedList: missing keys for items',
]);

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Course';
/******************************************************************************/

interface IState {
  loading: boolean;
  classes: IDropDownOptions;
  sClass: string;
  subjects: IDropDownOptions;
  sSubject: string;
  sType: string;
}

type StateKeys = 'sClass' | 'sSubject' | 'sType';

export default class CourseSelection extends Component<NavigationStackScreenProps, IState> {
  state = {
    loading: true,
    classes: [{ label: '', value: '' }],
    sClass: '',
    subjects: [{ label: '', value: '' }],
    sSubject: '',
    sType: '',
  };

  private courseService: CourseService;

  constructor(props: NavigationStackScreenProps) {
    super(props);

    this.courseService = CourseService.getInstance();
  }

  async componentDidMount() {
    await this.courseService.init();
    this.setState({
      loading: false,
      classes: this.courseService.getClasses(),
    });
  }

  onSelectionChange(key: StateKeys, value: string) {
    this.setState({
      [key]: value,
    } as Pick<IState, StateKeys>);
  }

  nextButtonPressed = () => {
    const { sClass, sSubject, sType } = this.state;

    const canGoNext = this.courseService.canGoNext(sClass, sSubject);
    if (canGoNext) {
      if (sType === 'Lectures') {
        this.props.navigation.navigate('LectureSelection', { sClass, sSubject });
      } else {
        this.props.navigation.navigate('QuestionQuizzesSelection', {
          sClass,
          sSubject,
        });
      }
    }
  }

  render() {
    const { loading, classes, sClass, sSubject, sType } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={SCREEN_TITLE} />
        <Text style={styles.textStyle}>Select Course</Text>
        {loading ? (
          <Loading />
        ) : (
          <Content contentContainerStyle={styles.container}>
            {/* <Image style={SCREEN_IMAGE_LOGO} source={logo} /> */}
            <Dropdown
              sValue={sClass}
              list={classes}
              onValueChange={itemValue =>
                this.onSelectionChange('sClass', itemValue)
              }
            />
            <Dropdown
              sValue={sSubject}
              list={this.courseService.getSubjects(sClass)}
              onValueChange={itemValue =>
                this.onSelectionChange('sSubject', itemValue)
              }
            />
            <Dropdown
              sValue={sType}
              list={this.courseService.getTypes()}
              onValueChange={itemValue =>
                this.onSelectionChange('sType', itemValue)
              }
            />
            <Button disabled={!sClass || !sSubject || !sType} onPress={this.nextButtonPressed} style={styles.nextButton}>
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
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    // marginTop: 10,
  },
  nextButton: {
    alignSelf: 'center',
    marginEnd: 20,
  },
});
