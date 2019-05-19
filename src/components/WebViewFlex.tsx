import React from 'react';
import {
  View,
  WebView,
  ViewStyle,
  StyleProp,
  NavState,
  ActivityIndicator,
  Text,
  NativeSyntheticEvent,
  WebViewMessageEventData,
} from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
  url: string;
  onLoadStart?: (event: NavState) => void;
  onLoadEnd?: (event: NavState) => void;
  onError?: (event: NavState) => void;
  onMessage?: (event: NativeSyntheticEvent<WebViewMessageEventData>) => void;
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
      javaScriptEnabled={true}
      injectedJavaScript={captureData}
      onMessage={props.onMessage}
      renderLoading={() => (
        <ActivityIndicator
          animating={true}
          color='#84888d'
          size='large'
          hidesWhenStopped={true}
          style={{ alignItems: 'center', justifyContent: 'center', padding: 30, flex: 1 }}
        />
      )}
      startInLoadingState={true}
    />
  </View>
);

export default WebViewFlex;
