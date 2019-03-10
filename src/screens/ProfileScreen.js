import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { Auth } from 'aws-amplify';

export default class ProfileScreen extends React.Component {
  state = {
    profile: []
  }
  async componentDidMount() {
    const profile = await Auth.currentAuthenticatedUser();
    const attr = await Auth.userAttributes(profile);
    console.log('profile', attr[0].Value);
    this.setState({profile: attr})
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.profile ? this.state.profile.map(att => (
            <Text style={styles.textStyle} key={att.Name}>{att.Name}: {att.Value}</Text>
          )) : 'Loading...'
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textStyle: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
})