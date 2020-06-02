import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Dimensions,
  Image,
} from 'react-native';

import Auth from '@aws-amplify/auth';

import { Container, Item, Input, Icon } from 'native-base';

import Button from '../../components/ButtonComponent';
import { showErrorAlert } from '../../services/error';
import { NavigationStackScreenProps } from 'react-navigation-stack';

// Load the app logo
import logo from '../../images/logo.png';

const { height, width } = Dimensions.get('window');

interface State {
  username: string;
  authCode: string;
  newPassword: string;
  loading1: boolean;
  loading2: boolean;
}

type StateKeys = keyof State;

export default class ForgetPasswordScreen extends React.Component<NavigationStackScreenProps, State> {
  state = {
    username: '',
    authCode: '',
    newPassword: '',
    loading1: false,
    loading2: false,
  };
  onChangeText(key: StateKeys, value: any) {
    this.setState({
      [key]: value,
    } as Pick<State, StateKeys>);
  }
  // Request a new password
  forgotPassword = async () => {
    const { username } = this.state;
    this.setState({ loading1: true });
    await Auth.forgotPassword(username)
      .then(() => {
        this.setState({ loading1: false });
        console.log('Verification Code has been sent');
        Alert.alert(
          'Verification Code Sent',
          'Please check your associated email and provide new password with verification code',
        );
      })
      .catch((err) => {
        this.setState({ loading1: false });
        showErrorAlert('Error while setting up the new password: ', err);
      });
  }
  // Upon confirmation redirect the user to the Sign In page
  forgotPasswordSubmit = async () => {
    const { username, authCode, newPassword } = this.state;
    this.setState({ loading2: true });
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        this.setState({ loading2: false });
        Alert.alert(
          'Password Changed Successfully',
          'Your password has been updated ',
        );
        this.props.navigation.navigate('SignIn');
        console.log('the New password submitted successfully');
      })
      .catch((err) => {
        this.setState({ loading2: false });
        showErrorAlert('Error while confirming the new password: ', err);
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          enabled={true}
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              {/* App Logo */}
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.image} />
              </View>
              {/* Infos */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* Username */}
                  <Item rounded={true} style={styles.itemStyle}>
                    <Icon
                      active={true}
                      name='person'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onChangeText={value =>
                        this.onChangeText('username', value)
                      }
                    />
                  </Item>
                  <Button
                    onPress={this.forgotPassword}
                    loading={this.state.loading1}
                    text='Send Code'
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonText}
                  />
                  <Item rounded={true} style={styles.itemStyle}>
                    <Icon
                      active={true}
                      name='lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='New password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onChangeText={value =>
                        this.onChangeText('newPassword', value)
                      }
                    />
                  </Item>

                  {/**************** Code confirmation section  *****************/}

                  <Item rounded={true} style={styles.itemStyle}>
                    <Icon
                      active={true}
                      name='md-apps'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Confirmation code'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'numeric'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value =>
                        this.onChangeText('authCode', value)
                      }
                    />
                  </Item>
                  <Button
                    onPress={this.forgotPasswordSubmit}
                    loading={this.state.loading2}
                    text='Confirm the new password'
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonText}
                  />
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    height: 30,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    width: width - 30,
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 'auto',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: '#5a52a5',
    fontSize: 28,
    marginLeft: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#667292',
    padding: height / 60,
    marginBottom: 15,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 'auto',
    bottom: height - 225,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: height / 3.5,
    height: height / 5.25,
  },
});
