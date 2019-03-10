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
            <View key={att.Name}>
              <Text style={styles.textTitle}>{att.Name}</Text>
              <Text style={styles.textDescription}>{att.Value}</Text>
            </View>
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
  textTitle: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  textDescription: {
    paddingLeft: 20,
    fontSize: 18
  }
})