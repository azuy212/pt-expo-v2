import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logo from '../../images/logo.png';
import { Icon } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }: {tintColor: any}) => (
      <Icon name='home' />
    ),
  };
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
