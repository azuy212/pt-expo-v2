import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { H1, H3, Container, Content } from 'native-base';
import HeaderComponent from '../../../components/HeaderComponent';
import { NavigationScreenProps } from 'react-navigation';

export default class QuizComplete extends Component<NavigationScreenProps> {
  render() {
    const { correctAnswers, totalQuizzes } = this.props.navigation.state.params!;
    return (
      <Container>
        <HeaderComponent title='Quiz Result' {...this.props} />
          <H1 style={{ margin: 20 }}>You have completed the quiz!</H1>
        <Content contentContainerStyle={styles.container}>
          <H3>Score: {correctAnswers}</H3>
          <H3>Total: {totalQuizzes}</H3>
          <H3>Percentage: {(correctAnswers / totalQuizzes) * 100}%</H3>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
