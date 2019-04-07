import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import Auth from '@aws-amplify/auth';
import { Font } from 'expo';

interface State {
  userToken: any;
}

export default class AuthLoadingScreen extends React.Component<NavigationScreenProps, State> {
  state = {
    userToken: null,
  };

  async componentDidMount() {
    await this.loadApp();
  }

  // Get the logged in users and remember them
  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user: any) => {
        this.setState({
          userToken: user.signInUserSession.accessToken.jwtToken,
        });
      })
      .catch(err => console.log(err));
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });
    this.props.navigation.navigate(this.state.userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#fff' />
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
