import React, { Component } from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import moment from 'moment';
import { Header } from 'react-native-elements';

interface IState {
  startTime: moment.Moment;
  elapsedTime: string;
}

interface IProps {
  style?: StyleProp<ViewStyle>;
  stop?: boolean;
  onBackPress: Function;
  onForwardPress: Function;
}

export default class QuizHeader extends Component<IProps, IState> {
  state = {
    startTime: moment(),
    elapsedTime: '',
  };

  timer: number = 0;

  componentDidMount() {
    this.setState({ startTime: moment() });
    this.timer = setInterval(() => {
      if (!this.props.stop) {
        const now = moment();
        const elapsedTime = moment.utc(
          moment(now, 'HH:mm:ss').diff(moment(this.state.startTime, 'HH:mm:ss')),
        );

        this.setState({ elapsedTime: elapsedTime.format('HH:mm:ss') });
      }
    },                       1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: this.props.onBackPress,
          underlayColor: '#3D6DCC',
        }}
        centerComponent={{ text: this.state.elapsedTime, style: styles.elapsedTime }}
        rightComponent={{
          icon: 'arrow-forward',
          color: '#fff',
          onPress: this.props.onForwardPress,
          underlayColor: '#3D6DCC',
        }}
        containerStyle={[styles.container, this.props.style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#3f51b5',
    alignItems: 'center',
  },
  elapsedTime: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
