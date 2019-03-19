import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import { Input, Button, Divider } from 'react-native-elements';

export default class ChatScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled={true}
        behavior='padding'
      >
        {/* <View style={styles.container}> */}
        <Input
          leftIcon={{ name: 'subject' }}
          placeholder='Subject'
          shake={true}
        />
        <Input
          leftIcon={{ name: 'message' }}
          placeholder='Message'
          shake={true}
          multiline={true}
        />
        <Divider />
        <Button title='Submit' />
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
