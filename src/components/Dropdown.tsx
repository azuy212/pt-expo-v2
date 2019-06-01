import React, { Component } from 'react';
import { Picker, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface IProps {
  onValueChange: (itemValue: any, itemPosition: number) => void;
  list: { label: string; value: string }[];
  sValue: string;
}
export default class Dropdown extends Component<IProps> {
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
    height: height / 14.5,
    marginTop: height / 73.15,
    marginBottom: height / 73.15,
    marginLeft: width / 41.15,
    marginRight: width / 41.15,
  },
});
