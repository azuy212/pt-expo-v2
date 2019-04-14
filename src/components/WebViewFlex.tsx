import React from 'react';
import { View, WebView, ViewStyle, StyleProp } from 'react-native';

interface IProps {
  style: StyleProp<ViewStyle>;
  url: string;
}

const WebViewFlex = (props: IProps) => {
  return (
    <View style={props.style}>
      <WebView style={{ flex: 1 }} contentInset={{ right: 50 }} source={{ uri: props.url }} />
    </View>
  );
};

export default WebViewFlex;
