import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { Button } from 'react-native-elements';

import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js';
import { showErrorAlert } from '../../services/error';
import { NavigationScreenProps } from 'react-navigation';
import HeaderComponent from '../../components/HeaderComponent';
import { Container, Content } from 'native-base';
import Loading from '../../components/Loading';

/******************************** Screen Title /********************************/
const SCREEN_TITLE = 'Profile';
/******************************************************************************/

interface State {
  attr: ICognitoUserAttributeData[];
  profile: any;
}

export default class ProfileScreen extends React.Component<NavigationScreenProps, State> {
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
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return this.state.profile ? (
      <Container>
        <Content>
      <HeaderComponent {...this.props} title={SCREEN_TITLE} />
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
            onPress={() => this.props.navigation.navigate('Settings')}
          />
        </View>
      </View>
        </Content>
      </Container>
    ) : (
      <Loading />
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
    margin: 10,
  },
});
