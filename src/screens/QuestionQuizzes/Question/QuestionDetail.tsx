import React, { Component } from 'react';
import { StyleSheet, NativeSyntheticEvent, WebViewMessageEventData } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Content, View, H1 } from 'native-base';

import HeaderComponent from '../../../components/HeaderComponent';
import { FilesBaseUrl } from '../../../services/question';
import WebViewFlex from '../../../components/WebViewFlex';

interface IState {
  filePath: string;
  videoPath: string;
  sQuestion: string;
  error: boolean;
}

export default class QuestionDetail extends Component<NavigationScreenProps, IState> {
  state = {
    filePath: '',
    videoPath: '',
    sQuestion: 'Question Detail',
    error: false,
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState(params as IState);
  }

  handleError = (event: NativeSyntheticEvent<WebViewMessageEventData>) => {
    const message = event.nativeEvent.data;
    const regex = /<Code>AccessDenied<\/Code>/;
    const error = regex.test(message);
    this.setState({ error });
  }

  render() {
    const { error, filePath } = this.state;
    return (
      <Container>
        <HeaderComponent {...this.props} title={this.state.sQuestion} />
        <Content contentContainerStyle={{ flex: 1 }}>
          {error ? (
            <View style={styles.error}>
              <H1>No Data Found!</H1>
            </View>
          ) : (
            <WebViewFlex
              style={styles.webView}
              url={`${FilesBaseUrl}/${filePath}`}
              onMessage={this.handleError}
            />
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  webView: {
    flex: 8,
  },
  error: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
