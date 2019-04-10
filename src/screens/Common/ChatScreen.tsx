import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Textarea,
  Button,
  Text,

} from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import { NavigationScreenProps } from 'react-navigation';
import { StyleSheet } from 'react-native';

export default class ChatScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <Container style={styles.container}>
        <HeaderComponent title='Chat' {...this.props} />
        <Content contentContainerStyle={styles.containerContent}>
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
