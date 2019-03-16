import React from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';

interface HeaderComponentProps {
  icon: string;
  text: string;
  onPress?: () => void;
}

export default (props: HeaderComponentProps) => (
  <View>
    <Icon
      name={props.icon}
      size={30}
      onPress={() => ToastAndroid.show(props.text, ToastAndroid.LONG)}
    />
    <Text style={styles.title}>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});
