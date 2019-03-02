import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export default props => (
  <TouchableOpacity style={props.buttonStyle} onPressIn={props.onPress}>
    {props.loading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text style={props.buttonTextStyle}>{props.text}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#667292",
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  },
  text: {
    color: "white"
  }
});
