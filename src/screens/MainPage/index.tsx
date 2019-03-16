import React from 'react';
import { Header, Image } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import { View, StyleSheet } from 'react-native';

import HeaderComponent from '../../components/HeaderComponent';

import logo from '../../images/logo.png';

export default (props: any) => (
  <View style={styles.containerStyle}>
    <Header
      leftComponent={<HeaderComponent icon='chat' text='Chat' />}
      centerComponent={
        <Image source={logo} style={{ width: 70, height: 50 }} />}
      rightComponent={
        <HeaderComponent
          icon='person'
          text='Profile'
          onPress={props.navigation.navigate('profile')}
        />
      }
      containerStyle={styles.headerStyle}
      statusBarProps={{ hidden: true }}
    />
    <View style={styles.contentStyle}>
      <HomeScreen />
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
