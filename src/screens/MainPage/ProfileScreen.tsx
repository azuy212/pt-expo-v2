import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import { Button } from 'react-native-elements';

import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js';
import { showErrorAlert } from '../../services/error';
import { Screens } from './MainPage';

interface Props {
  navigate: (screen: Screens) => void;
}

interface State {
  attr: ICognitoUserAttributeData[];
  profile: any;
}

export default class ProfileScreen extends React.Component<Props, State> {
  state: Readonly<State> = {
    profile: null,
    attr: [],
  };

  async componentDidMount() {
    try {
      const profile = await Auth.currentAuthenticatedUser();
      let attr: any = await Auth.userAttributes(profile);
      attr = attr.filter(
        (att: any) =>
          att.Name === 'sub' ||
          att.Name === 'email' ||
          att.Name === 'phone_number',
      ).map((att:any) => {
        switch (att.Name) {
          case 'sub':
            return { ...att, Name: 'id' };
          case 'email':
            return { ...att, Name: 'Email' };
          case 'phone_number':
            return { ...att, Name: 'Phone Number' };
          default:
            return { ...att };
        }
      });
      this.setState({ profile, attr });
    } catch (err) {
      showErrorAlert('Error when getting Profile Info', err);
      this.props.navigate('home');
    }
  }

  render() {
    return this.state.profile ? (
      <View style={styles.container}>
        <Text style={styles.textHeader}>{this.state.profile.username}</Text>
        {this.state.attr.map(att => (
          <View key={att.Name}>
            <Text style={styles.textTitle}>{att.Name}</Text>
            <Text style={styles.textDescription}>{att.Value}</Text>
          </View>
        ))}
        <View style={styles.buttonStyle}>
          <Button
            title='Settings'
            onPress={() => this.props.navigate('settings')}
          />
        </View>
      </View>
    ) : (
      <ActivityIndicator size='large' />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textHeader: {
    alignSelf: 'center',
    fontSize: 50,
    paddingBottom: 50,
  },
  textTitle: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textDescription: {
    paddingLeft: 20,
    fontSize: 18,
  },
  buttonStyle: {
    marginTop: 50,
    alignSelf: 'stretch',
  },
});
