import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import Loading from './Loading';
import {
  WebViewNavigationEvent,
  WebViewErrorEvent,
} from 'react-native-webview/lib/WebViewTypes';

interface IProps {
  style?: StyleProp<ViewStyle>;
  url: string;
  onLoadStart?: (event: WebViewNavigationEvent) => void;
  onLoadEnd?: (event: WebViewNavigationEvent | WebViewErrorEvent) => void;
  onError?: (event: WebViewErrorEvent) => void;
  onMessage?: (event: WebViewMessageEvent) => void;
}

const captureData = `setTimeout(() => {
  window.postMessage(document.getElementsByTagName('body')[0].innerText, '*');
}, 10);
`;

const WebViewFlex = (props: IProps) => (
  <View style={[{ flex: 1 }, props.style]}>
    <WebView
      style={{ flex: 1 }}
      source={{ uri: props.url }}
      onLoadStart={props.onLoadStart}
      onLoadEnd={props.onLoadEnd}
      onError={props.onError}
      javaScriptEnabled={true}
      injectedJavaScript={captureData}
      onMessage={props.onMessage}
      renderLoading={() => <Loading />}
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
);

export default WebViewFlex;
