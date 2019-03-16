import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Image,
  Dimensions,
} from 'react-native';

import Auth from '@aws-amplify/auth';

import { Container, Item, Input, Icon } from 'native-base';

import Button from '../../components/ButtonComponent';
import { NavigationScreenProps } from 'react-navigation';
import { showErrorAlert } from '../../services/error';

// Load the app logo
import logo from '../../images/logo.png';

const { height } = Dimensions.get('window');

interface State {
  username: string;
  password: string;
  loading: boolean;
}

type StateKeys = keyof State;

export default class SignInScreen extends React.Component<NavigationScreenProps, State> {
  state = {
    username: '',
    password: '',
    loading: false,
  };

  onChangeText(key: StateKeys, value: any) {
    this.setState({
      [key]: value,
    } as Pick<State, StateKeys>);
  }
  async signIn() {
    const { username, password } = this.state;
    this.setState({ loading: true });
    await Auth.signIn(username, password)
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('Authloading');
      })
      .catch((err) => {
        this.setState({ loading: false });
        showErrorAlert('Error when signing in: ', err);
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
                <Image style={styles.image} source={logo} />
              </View>
              {/* Infos */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
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
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onChangeText={value =>
                        this.onChangeText('username', value)
                      }
                    />
                  </Item>
                  <Item rounded={true} style={styles.itemStyle}>
                    <Icon active={true} name='lock' style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder='Password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onChangeText={value =>
                        this.onChangeText('password', value)
                      }
                    />
                  </Item>
                  <Button
                    onPress={() => this.signIn()}
                    loading={this.state.loading}
                    text='Sign In'
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonText}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={styles.buttonLink}
                      onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                      Register
                    </Text>
                    <Text
                      style={styles.buttonLink}
                      onPress={() =>
                        this.props.navigation.navigate('ForgetPassword')
                      }
                    >
                      Forget Password?
                    </Text>
                  </View>
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
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5a52a5',
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
    padding: 14,
    marginBottom: 20,
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
    bottom: height - 250,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 130,
  },
  buttonLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
