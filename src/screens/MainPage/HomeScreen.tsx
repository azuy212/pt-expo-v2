import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import logo from '../../images/logo.png';
import HeaderComponent from '../../components/HeaderComponent';
import { headerHeight } from '../../theme/header';
import { Icon } from 'native-base';

export default class HomeScreen extends Component<NavigationScreenProps> {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }: {tintColor: any}) => (
      <Icon name='home' />
    ),
  };
  render() {
    return (
      <View>
        <HeaderComponent {...this.props} title='Home' />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={logo} />
            <Text style={styles.textStyle}>Welcome to Pocket Tutor</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: headerHeight,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  logoImage: {
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
