import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
  title: string;
  value: string | number;
}

const QuizResultField = (props: IProps) => {
  return (
    <View style={styles.field}>
      <Text style={styles.title}>{props.title}: </Text>
      <Text style={styles.value}>{props.value}</Text>
    </View>
  );
};

export default QuizResultField;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  value: {
    fontSize: 18,
  },
});
