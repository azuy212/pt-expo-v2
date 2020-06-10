import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Row, Grid, Col, Button, Text, H2, H3 } from 'native-base';
import moment from 'moment';

import HeaderComponent from '../../../components/HeaderComponent';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { calculatePercentage } from '../../../services/common';
import QuizResultField from '../../../components/QuizResultField';

interface IState {
  correct: number;
  incorrect: number;
  total: number;
  skipped: number;
  percentage: number;
  startTime: number;
  endTime: number;
  duration: number;
}

type IProps = NavigationStackScreenProps;

export default class QuizComplete extends Component<IProps, IState> {
  state = {
    correct: 0,
    incorrect: 0,
    total: 0,
    skipped: 0,
    percentage: 0,
    startTime: 0,
    endTime: 0,
    duration: 0,
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { correct, total, skipped, startTime, endTime } = params!;
    this.setState({
      correct,
      total,
      skipped,
      startTime,
      endTime,
      duration: this.getDuration(startTime, endTime),
      incorrect: total - correct - skipped,
      percentage: calculatePercentage(correct, total),
    });
  }

  isStartAndEndDateSame = () => {
    const { startTime, endTime } = this.state;
    const start = moment(startTime);
    const end = moment(endTime);
    return start.isSame(end, 'date');
  }

  get getStartTimeString() {
    const start = moment(this.state.startTime);
    return this.isStartAndEndDateSame()
      ? start.format('hh:mm:ss a')
      : start.format('MMM DD, YY hh:mm:ss a');
  }

  get getEndTimeString() {
    const end = moment(this.state.endTime);
    return this.isStartAndEndDateSame()
      ? end.format('hh:mm:ss a')
      : end.format('MMM DD, YY hh:mm:ss a');
  }

  getDuration = (start: number, end: number) => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    return duration.asSeconds();
  }

  retryQuiz = () => {
    const { sClass, sSubject, sChapter } = this.props.navigation.state.params!;
    this.props.navigation.navigate('QuizDetail', {
      sClass,
      sSubject,
      sChapter,
    });
  }

  startAnotherQuiz = () => {
    this.props.navigation.navigate('Home');
  }

  getPercentageColor = () => {};

  render() {
    const { correct, incorrect, total, skipped, duration } = this.state;
    const { sClass, sSubject, sChapter } = this.props.navigation.state.params!;
    const percentage = calculatePercentage(correct, total);
    return (
      <Container>
        <HeaderComponent title='Quiz Result' {...this.props} />
            <H2 style={styles.title}>Quiz Result!</H2>
            <H3 style={styles.title}>{sSubject} ({sClass}) - Chapter {sChapter}</H3>
        <Grid>
          <Row>
            <Grid>
              <Row style={styles.rowMargin}>
                <Col>
                  <QuizResultField title='Score' value={`${percentage}%`} />
                </Col>
                <Col>
                  <QuizResultField title='Attempted' value={total} />
                </Col>
              </Row>
              <Row style={styles.rowMargin}>
                <Col>
                  <QuizResultField title='Correct' value={correct} />
                </Col>
                <Col>
                  <QuizResultField title='Incorrect' value={incorrect} />
                </Col>
              </Row>
              <Row>
                <Col />
                <Col>
                  <QuizResultField title='Skipped' value={skipped} />
                </Col>
                <Col />
              </Row>
            </Grid>
          </Row>
          <Row>
            <Grid>
              <Row style={styles.centered}>
                <QuizResultField
                  title='Started'
                  value={this.getStartTimeString}
                />
              </Row>
              <Row style={styles.centered}>
                <QuizResultField
                  title='Completed'
                  value={this.getEndTimeString}
                />
              </Row>
              <Row style={styles.centered}>
                <QuizResultField title='Duration' value={`${duration} s`} />
              </Row>
            </Grid>
          </Row>
          <Row>
            <Grid style={styles.centered}>
              <Row>
                <Button onPress={this.retryQuiz} style={styles.button}>
                  <Text>Retry Quiz</Text>
                </Button>
              </Row>
              <Row>
                <Button onPress={this.startAnotherQuiz} style={styles.button}>
                  <Text>Start Another Quiz</Text>
                </Button>
              </Row>
            </Grid>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowMargin: {
    marginLeft: 0,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
  },
});
