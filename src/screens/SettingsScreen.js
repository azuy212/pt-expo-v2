import React from 'react'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Dimensions
} from 'react-native'

import Button from '../components/ButtonComponent'

import Auth from '@aws-amplify/auth'

import {
  Container,
  Item,
  Input,
  Icon,
} from 'native-base'

const { height } = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
  state = {
    password1: '',
    password2: '',
    loading: false
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // Change user password for the app
  changePassword = async () => {
    const { password1, password2 } = this.state
    this.setState({ loading: true })
    await Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, password1, password2)
    })
    .then(data => {
      this.setState({ loading: false });
      console.log('Password changed successfully', data);
      Alert.alert('Password Changed!', 'Your password has been changed successfully!');
    })
    .catch(err => {
      this.setState({ loading: false });
      if (! err.message) {
        console.log('Error changing password: ', err)
        Alert.alert('Error changing password: ', err)
      } else {
        console.log('Error changing password: ', err.message)
        Alert.alert('Error changing password: ', err.message)
      }
    })
  }
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app?',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        {text: 'OK', onPress: () => this.signOut()},
      ],
      { cancelable: false }
    )
  }
  signOut = async () => {
    await Auth.signOut()
    .then(() => {
      console.log('Sign out complete')
      this.props.navigation.navigate('Authloading')
    })
    .catch(err => console.log('Error while signing out!', err))
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <View style={[styles.buttonStyle, {borderRadius: 4, marginBottom: 20}]}>
                    <Text style={styles.buttonText}>Change password</Text>              
                  </View>
                  {/* Old password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Old password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={(event) => { this.refs.SecondInput._root.focus() }}
                      onChangeText={value => this.onChangeText('password1', value)}
                    />
                  </Item>    
                  {/* New password */}              
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='New password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('password2', value)}
                    />
                  </Item>
                  <Button 
                    onPress={this.changePassword}
                    loading={this.state.loading}
                    text="Submit"
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonText}
                  />
                  <View 
                    style={{justifyContent: 'center', alignItems: 'center', height: height / 10}}/>
                  <TouchableOpacity
                    style={[styles.buttonStyle, {flexDirection: 'row', justifyContent: 'center'}]}
                    onPress={this.signOutAlert}>
                    <Icon name='md-power' style={{color: '#fff', paddingRight: 10}}/>
                    <Text style={styles.buttonText}>
                      Sign out
                    </Text>
                  </TouchableOpacity>
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
    flexDirection: 'column'
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  itemStyle: {
    marginTop: 20,
  },
  iconStyle: {
    color: '#5a52a5',
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#667292',
    padding: height / 50,
    marginTop: 20,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
})