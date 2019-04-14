import React from 'react';
import { View, WebView, ViewStyle, StyleProp, NavState, ActivityIndicator, Text } from 'react-native';

interface IProps {
  style: StyleProp<ViewStyle>;
  url: string;
  onLoadStart?: (event: NavState) => void;
  onLoadEnd?: (event: NavState) => void;
  onError?: (event: NavState) => void;
}

const WebViewFlex = (props: IProps) => {
  return (
    <View style={props.style}>
      <WebView
        style={{ flex: 1 }}
        contentInset={{ right: 50 }}
        source={{ uri: props.url }}
        onLoadStart={props.onLoadStart}
        onLoadEnd={props.onLoadEnd}
        // onError={props.onError}
        renderLoading={ () => (
          <ActivityIndicator
            animating={true}
            color='#84888d'
            size='large'
            hidesWhenStopped={true}
            style={{ alignItems:'center', justifyContent:'center', padding:30, flex: 1 }}
          />
        )}
        startInLoadingState={true}
        renderError={() => {
          return <View>
            <Text>Error</Text>
          </View>;
        }}
      />
    </View>
  );
};

export default WebViewFlex;
