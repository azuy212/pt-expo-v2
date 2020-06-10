import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { WebViewNavigationEvent, WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';

interface IProps {
  style?: StyleProp<ViewStyle>;
  url: string;
  onLoadStart?: (event: WebViewNavigationEvent) => void;
  onLoadEnd?: (event: WebViewNavigationEvent | WebViewErrorEvent) => void;
  onError?: (event: WebViewErrorEvent) => void;
  onMessage?: (event: WebViewMessageEvent) => void;
  isQuiz?: boolean;
}

const captureData = (isQuiz = false) => `
function isError() {
  const errorElement = document.getElementsByTagName('Error')[0];
  if (errorElement) {
    const codeElement = errorElement.getElementsByTagName('Code')[0];
    if (codeElement.innerHTML === 'AccessDenied') {
      window.ReactNativeWebView.postMessage("Error");
      return true;
    }
  }
  return false;
}
if (!isError()) {
  window.ReactNativeWebView.postMessage("Success");
  if (${isQuiz}) {
    document.body.innerHTML = document.body.innerHTML.replace(/<p/g, '<font');
    document.body.innerHTML = document.body.innerHTML.replace(/p>/g, 'font>');
    document.body.innerHTML = document.body.innerHTML.replace(/&nbsp;/g, '');
    document.body.innerHTML = document.body.innerHTML.replace('.<span', '. &nbsp;<span');
    document.body.innerHTML = document.body.innerHTML.replace(/<p class=\"MsoListParagraphCxSpFirst\"/g, '<p class=');
    document.body.innerHTML = document.body.innerHTML.replace(/MsoListParagraphCxSpMiddle/g, '');
    document.body.innerHTML = document.body.innerHTML.replace(/MsoListParagraphCxSpLast/g, '');
    document.body.innerHTML = document.body.innerHTML.replace(/margin-left/g, '');
    document.body.innerHTML = document.body.innerHTML.replace('A.', '<div style=margin-left:20px;margin-bottom:10px;margin-top:10px;>A.');
    document.body.innerHTML = document.body.innerHTML.replace('B.', '</div><div style=margin-left:20px;margin-bottom:10px;>B.');
    document.body.innerHTML = document.body.innerHTML.replace('C.', '</div><div style=margin-left:20px;margin-bottom:10px;>C.');
    document.body.innerHTML = document.body.innerHTML.replace('D.', '</div><div style=margin-left:20px;margin-bottom:10px;>D.');
  }
}
true;
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
      injectedJavaScript={captureData(props.isQuiz)}
      onMessage={props.onMessage}
      startInLoadingState={true}
      scalesPageToFit={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

export default WebViewFlex;
