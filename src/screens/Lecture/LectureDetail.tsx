import React, { Component } from 'react';
import { StyleSheet, NativeSyntheticEvent, Image } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Container, Content, View, H1 } from 'native-base';

import HeaderComponent from '../../components/HeaderComponent';
import { FilesBaseUrl } from '../../services/lecture';
import WebViewFlex from '../../components/WebViewFlex';
import { WebViewMessageEvent } from 'react-native-webview';

interface IState {
  filePath: string;
  videoPath: string;
  sTitle: string;
  error: boolean;
}

export default class LectureDetail extends Component<NavigationStackScreenProps, IState> {
  state = {
    filePath: '',
    videoPath: '',
    sTitle: 'Lecture Detail',
    error: false,
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState(params as IState);
  }

  handleError = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    this.setState({ error: message === 'Error' });
  }

  videoIconPress = () => {
    this.props.navigation.navigate('LectureVideo', {
      videoUrl: `${FilesBaseUrl}/${this.state.videoPath}`,
      sTitle: this.state.sTitle,
    });
  }

  render() {
    const { error, filePath } = this.state;
    return (
      <Container>
        <HeaderComponent
          {...this.props}
          title={this.state.sTitle}
          isVideoAvailable={true}
          videoIconPress={this.videoIconPress}
        />
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
              onError={() => this.setState({ error: true })}
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
  headerStyle: {
    backgroundColor: '#FFF',
  },
  logoStyle: {
    width: 100,
    height: 75,
    marginBottom: 20,
  },
});
