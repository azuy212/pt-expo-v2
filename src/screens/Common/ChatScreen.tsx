import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Textarea, Button, Text } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import { NavigationScreenProps } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';

import logo from '../../images/logo.png';
import { SCREEN_IMAGE_LOGO } from '../../theme/image';

export default class ChatScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <Container style={styles.container}>
        <HeaderComponent title='Chat' {...this.props} />
        <Content contentContainerStyle={styles.containerContent}>
          <Image style={SCREEN_IMAGE_LOGO} source={logo} />
          <Form>
            <Item stackedLabel={true}>
              <Label>Subject</Label>
              <Input />
            </Item>
            <Item stackedLabel={true}>
              <Label>Message</Label>
              <Textarea rowSpan={5} style={styles.textArea} />
            </Item>
            <Button style={styles.button}>
              <Text>Send</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textArea: {
    width: '100%',
    paddingTop: 10,
  },
  button: {
    marginTop: 10,
  },
});
