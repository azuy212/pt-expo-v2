import React, { Component } from 'react';
import { Picker, StyleSheet } from 'react-native';

interface IProps {
  onValueChange: (itemValue: any, itemPosition: number) => void;
  list: { label: string; value: string }[];
  sValue: string;
}
export default class Dropdown extends Component<IProps> {
  state = {
    language: 'java',
  };
  render() {
    return (
      <Picker
        selectedValue={this.props.sValue}
        style={styles.dropdown}
        onValueChange={this.props.onValueChange}
        mode='dropdown'
      >
        {this.props.list.map(item => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    alignSelf: 'stretch',
    height: 50,
    margin: 10,
  },
});
