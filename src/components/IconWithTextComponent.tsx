import React from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';

interface HeaderComponentProps {
  icon: string;
  text?: string;
  onPress?: () => void;
}

export default (props: HeaderComponentProps) => (
  <TouchableNativeFeedback onPress={props.onPress}>
    <View>
      <Icon name={props.icon} size={30} onPress={props.onPress} />
      {props.text ? <Text style={styles.title}>{props.text}</Text> : null}
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});
