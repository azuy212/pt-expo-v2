import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

const logo = require('../../images/logo.png');

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingBottom: 50}}>
          <Image style={{width: 300, height: 200}} source={logo} />
        </View>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome to Pocket Tutor</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})