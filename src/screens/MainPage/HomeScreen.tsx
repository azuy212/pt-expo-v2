import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logo from '../../images/logo.png';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <View style={{ paddingBottom: 50 }}>
          <Image style={{ width: 300, height: 200 }} source={logo} />
        </View>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          Welcome to Pocket Tutor
        </Text>
      </View>
    );
  }
}
