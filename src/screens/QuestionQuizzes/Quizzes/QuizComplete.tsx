import React from 'react';
import { StyleSheet } from 'react-native';
import { H1, H3, Container, Content } from 'native-base';

import HeaderComponent from '../../../components/HeaderComponent';
import { NavigationScreenProps } from 'react-navigation';
import { calculatePercentage } from '../../../services/common';

const QuizComplete = (props: NavigationScreenProps) => {
  const { correctAnswers, totalQuizzes, skipped } = props.navigation.state.params!;
  return (
    <Container>
      <HeaderComponent title='Quiz Result' {...props} />
      <H1 style={{ margin: 20 }}>You have completed the quiz!</H1>
      <Content contentContainerStyle={styles.container}>
        <H3>Score: {correctAnswers}</H3>
        <H3>Skipped: {skipped}</H3>
        <H3>Total: {totalQuizzes}</H3>
        <H3>Percentage: {calculatePercentage(correctAnswers, totalQuizzes)}%</H3>
      </Content>
    </Container>
  );
};

export default QuizComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
