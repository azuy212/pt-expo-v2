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
  Modal,
  FlatList,
  Image,
  Dimensions
} from 'react-native'

import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

// AWS Amplify
import Auth from '@aws-amplify/auth'

// Import data for countries
import data from './countriesData'

import Button from '../../components/ButtonComponent';

import Dialog from "react-native-dialog";

// Load the app logo
const logo = require('../../images/logo.png')

const { height } = Dimensions.get('window');

// Default render of country flag
const defaultFlag = data.filter(
  obj => obj.name === 'United Kingdom'
  )[0].flag

// Default render of country code
const defaultCode = data.filter(
  obj => obj.name === 'United Kingdom'
  )[0].dial_code

export default class SignUpScreen extends React.Component {
  state = {
    fullName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    flag: defaultFlag,
    modalVisible: false,
    authCode: '',
    loading: false,
    confirmCodeDialog: false
  }
  // Get user input
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // Functions for Phone Input
  showModal() {
    this.setState({ modalVisible: true })
    // console.log('Shown')
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // refocus on phone Input after selecting country and closing Modal
    this.refs.FourthInput._root.focus()
    // console.log('Hidden')
  }
  async getCountry(country) {
    const countryData = await data
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Set data from user choice of country
      this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }
  // Sign up user with AWS Amplify Auth
  async signUp() {
    const { fullName, username, password, email, phoneNumber } = this.state
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber
    this.setState({ loading: true })
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number, name: fullName }
      });
      this.setState({ loading: false, confirmCodeDialog: true})
      console.log('sign up successful!')
    } catch (error) {
      this.setState({ loading: false })
      const err = error.message ? error.message : error;
      console.log('Error when signing up: ', err)
      Alert.alert('Error when signing up: ', err)
    }
  }
  // Confirm users and redirect them to the SignIn page
  async confirmSignUp() {
    const { username, authCode } = this.state
    await Auth.confirmSignUp(username, authCode)
    .then(() => {
      this.setState({ confirmCodeDialog: false });
      console.log('Confirm sign up successful')
      Alert.alert(
        'Account Verified!', 
        'Congratulations! Your account has been verified successfully\n' +
        'Please Sign In to your account',
        [
          {
            text: 'Sign In',
            onPress: () => this.props.navigation.navigate('SignIn')
          }
        ]
      )
    })
    .catch(err => {
      if (! err.message) {
        console.log('Error when entering confirmation code: ', err)
        Alert.alert('Error when entering confirmation code: ', err)
      } else {
        console.log('Error when entering confirmation code: ', err.message)
        Alert.alert('Error when entering confirmation code: ', err.message)
      }
    })
  }
  // Resend code if not received already
  async resendSignUp() {
    const { username } = this.state
    await Auth.resendSignUp(username)
    .then(() => {
      console.log('Confirmation code resent successfully');
      Alert.alert('Confirmation code resent successfully')
    })
    .catch(err => {
      if (! err.message) {
        console.log('Error requesting new confirmation code: ', err)
        Alert.alert('Error requesting new confirmation code: ', err)
      } else {
        console.log('Error requesting new confirmation code: ', err.message)
        Alert.alert('Error requesting new confirmation code: ', err.message)
      }
    })
  }
  handleConfirmSignUpDialog = () => {
    Alert.alert(
      'Are you sure?', 
      'You cannot verify your account later by yourself,\n'+
      'You need to contact adminstrator for account verification',
      [
        {
          text: 'Verify Later',
          onPress: () => {
            this.setState({ confirmCodeDialog: false })
          },
          style: 'destructive'
        },
        {
          text: 'Verify Now',
          style: 'default'
        }
      ]
    );
  }
  render() {
    let { flag } = this.state
    const countryData = data
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior='padding' 
          enabled>
          <TouchableWithoutFeedback 
            style={styles.container} 
            onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* App Logo */}
                <View style={styles.logoContainer}>
                  <Image style={styles.image} source={logo}/>
                </View>
                <Container style={styles.infoContainer}>
                  <View style={styles.container}>
                    {/* Full Name section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='ios-person'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='Full Name'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={(event) => {this.refs.FirstInput._root.focus()}}
                        onChangeText={value => this.onChangeText('username', value)}
                      />
                    </Item>
                    {/* username section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
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
                        ref='FirstInput'
                        onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                        onChangeText={value => this.onChangeText('username', value)}
                      />
                    </Item>
                    {/*  password section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='lock'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor='#adb4bc'
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        // ref={c => this.SecondInput = c}
                        ref='SecondInput'
                        onSubmitEditing={(event) => {this.refs.ThirdInput._root.focus()}}
                        onChangeText={value => this.onChangeText('password', value)}
                      />
                    </Item>
                    {/* email section */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='mail'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={false}
                        ref='ThirdInput'
                        onSubmitEditing={(event) => {this.refs.FourthInput._root.focus()}}
                        onChangeText={value => this.onChangeText('email', value)}
                      />
                    </Item>
                    {/* phone section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='call'
                        style={styles.iconStyle}
                      />
                      {/* country flag */}
                      <View><Text>{flag}</Text></View>
                      {/* open modal */}
                      <Icon
                        active
                        name='md-arrow-dropdown'
                        style={[styles.iconStyle, { marginLeft: 0 }]}
                        onPress={() => this.showModal()}
                      />
                      <Input
                        style={styles.input}
                        placeholder='+44766554433'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={false}
                        ref='FourthInput'
                        value={this.state.phoneNumber}
                        onChangeText={(val) => {
                          if (this.state.phoneNumber===''){
                            // render UK phone code by default when Modal is not open
                            this.onChangeText('phoneNumber', defaultCode + val)
                          } else {
                            // render country code based on users choice with Modal
                            this.onChangeText('phoneNumber', val)
                          }}
                        }
                      />
                      {/* Modal for country code and flag */}
                      <Modal
                        animationType="slide" // fade
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.hideModal()}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flex: 7, marginTop: 80 }}>
                            <FlatList
                              style={{backgroundColor: '#ffffff'}}
                              data={countryData}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={
                                ({ item }) =>
                                  <TouchableWithoutFeedback onPress={() => this.getCountry(item.name)}>
                                    <View style={styles.countryStyle}>
                                      <Text style={styles.textStyle}>
                                        {item.flag} {item.name} ({item.dial_code})
                                      </Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                              }
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => this.hideModal()} 
                            style={styles.closeButtonStyle}>
                            <Text style={styles.textStyle}>
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </Item>
                    {/* End of phone input */}
                    <Button 
                      onPress={() => this.signUp()}
                      loading={this.state.loading}
                      text="Sign Up"
                      buttonStyle={styles.buttonStyle}
                      buttonTextStyle={styles.buttonText}
                    />
                    <Dialog.Container visible={this.state.confirmCodeDialog}>
                      <Dialog.Title>Enter Confirmation Code</Dialog.Title>
                      <Dialog.Description>
                        Please check your email and enter verification code you received. 
                      </Dialog.Description>
                      <Dialog.Input 
                        label="Verification Code" 
                        onChangeText={value => this.onChangeText('authCode', value)}
                        style={{borderBottomColor: '#ccc', borderBottomWidth: 2}}>
                      </Dialog.Input>
                      <Dialog.Button label="Resend Code" onPress={() => this.resendSignUp()} />
                      <Dialog.Button label="Cancel" onPress={() => this.handleConfirmSignUpDialog()} />
                      <Dialog.Button label="Verify" onPress={() => this.confirmSignUp()}/>
                    </Dialog.Container>
                  </View>
                </Container>
              </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
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
    height: height / 15,
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
    marginBottom: 10,
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
    marginBottom: 10,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
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
  textStyle: {
    padding: 5,
    fontSize: 18
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center', 
    borderTopWidth: 1,
    borderTopColor: '#211f',
    backgroundColor: '#fff3',
  },
  image: {
    width: height / 3.5,
    height: height / 5.25
  },
  buttonLink: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
})
