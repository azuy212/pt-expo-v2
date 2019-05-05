import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button, Text } from 'native-base';

interface IProps {
  buttonListener: (x: string) => void;
  style?: StyleProp<ViewStyle>;
}

const QuizAnswerButtons = (props: IProps) => {
  return (
    <View style={props.style}>
      <View style={styles.answerButtonGroup}>
        <Button large={true} onPress={() => props.buttonListener('A')} style={styles.answerButton}>
          <Text>A</Text>
        </Button>
        <Button large={true} onPress={() => props.buttonListener('B')} style={styles.answerButton}>
          <Text>B</Text>
        </Button>
      </View>
      <View style={styles.answerButtonGroup}>
        <Button large={true} onPress={() => props.buttonListener('C')} style={styles.answerButton}>
          <Text>C</Text>
        </Button>
        <Button large={true} onPress={() => props.buttonListener('D')} style={styles.answerButton}>
          <Text>D</Text>
        </Button>
      </View>
    </View>
  );
};

export default QuizAnswerButtons;

const styles = StyleSheet.create({
  answerButtonGroup: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  answerButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
  },
});
