import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationSwitchScreenProps } from 'react-navigation';

import Auth from '@aws-amplify/auth';
import * as Font from 'expo-font';
import Loading from '../components/Loading';

interface State {
  userToken: any;
}

export default class AuthLoadingScreen extends React.Component<NavigationSwitchScreenProps, State> {
  state = {
    userToken: null,
  };

  async componentDidMount() {
    await this.loadApp();
  }

  // Get the logged in users and remember them
  loadApp = async () => {
    const user = await Auth.currentAuthenticatedUser()
      .then((user) => {
        this.setState({
          userToken: user.signInUserSession.accessToken.jwtToken,
        });
      })
      .catch(err => console.log(err));
    await Font.loadAsync({
      Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('../../node_modules/native-base/Fonts/Ionicons.ttf'),
    });
    this.props.navigation.navigate(this.state.userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
