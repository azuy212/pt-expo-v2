import React, { Component } from 'react';
import { Text, View, WebView, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Content } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import { headerHeight } from '../../theme/header';

interface IState {
  params: { selectedTitle: string };
}

export default class LectureDetail extends Component<NavigationScreenProps, IState> {
  state = {
    params: { selectedTitle: '' },
  };
  constructor(props: NavigationScreenProps) {
    super(props);
    const { params } = props.navigation.state;
    this.state.params = params as any;
    console.log('state', params);
  }
  render() {
    return (
        <WebView
            onLoadStart={() => console.log('loading start')}
            onLoadEnd={() => console.log('loading end')}
            source={{
              uri:
                'http://34.205.144.242/simplyandroid_php/app/file/subsection/XPH/XPHC1/XPHC1S1/XPHC1S1.htm',
            }}
            style={{ margin: 10 }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
});
