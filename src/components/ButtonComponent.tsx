import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';

interface Props {
  loading: boolean;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
  text: string;
}

export default (props: Props) => (
  <TouchableOpacity
    style={props.buttonStyle || styles.button}
    onPressIn={props.onPress}
  >
    {props.loading ? (
      <ActivityIndicator size='small' color='white' />
    ) : (
      <Text style={props.buttonTextStyle || styles.text}>{props.text}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#667292',
    padding: 14,
    marginBottom: 20,
    borderRadius: 24,
  },
  text: {
    color: 'white',
  },
});
