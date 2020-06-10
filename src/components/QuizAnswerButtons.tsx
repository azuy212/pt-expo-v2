import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { Button, Text, Grid, Row, Col } from 'native-base';

const { width, height } = Dimensions.get('screen');

interface IProps {
  buttonListener: (x: string) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const QuizAnswerButtons = (props: IProps) => {
  return (
    <Grid style={props.style}>
      <Row style={{ alignItems: 'center' }}>
        <Col>
          <Button large={true} disabled={props.disabled} onPress={() => props.buttonListener('A')} style={styles.answerButton}>
            <Text>A</Text>
          </Button>
        </Col>
        <Col>
          <Button large={true} disabled={props.disabled} onPress={() => props.buttonListener('B')} style={styles.answerButton}>
            <Text>B</Text>
          </Button>
        </Col>
      </Row>
      <Row style={{ alignItems: 'center'  }}>
        <Col>
          <Button large={true} disabled={props.disabled} onPress={() => props.buttonListener('C')} style={styles.answerButton}>
            <Text>C</Text>
          </Button>
        </Col>
        <Col>
          <Button large={true} disabled={props.disabled} onPress={() => props.buttonListener('D')} style={styles.answerButton}>
            <Text>D</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  );
};

export default QuizAnswerButtons;

const styles = StyleSheet.create({
  answerButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width / 5,
    height: height / 10,
  },
});
