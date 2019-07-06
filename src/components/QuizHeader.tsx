import React, { Component } from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

import moment from 'moment';
import { Header } from 'react-native-elements';

interface IState {
  startTime: moment.Moment;
  elapsedTime: string;
}

interface IProps {
  style?: StyleProp<ViewStyle>;
  stop?: boolean;
  onBackPress: (event: GestureResponderEvent) => void;
  onForwardPress: (event: GestureResponderEvent) => void;
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
          color: '#000000',
          onPress: this.props.onBackPress,
        }}
        centerComponent={{ text: this.state.elapsedTime, style: styles.elapsedTime }}
        rightComponent={{
          icon: 'arrow-forward',
          color: '#000000',
          onPress: this.props.onForwardPress,
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: -10,
  },
  elapsedTime: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
