import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class Quiz extends Component<NavigationScreenProps> {
  componentDidMount() {

  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
