import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { StatusBar } from 'react-native';

import { headerHeight } from '../theme/header';

const statusBarHeight = StatusBar.currentHeight || 0;

interface Props {
  title: string;
}

type AllProps = Props & NavigationScreenProps;

export default class HeaderComponent extends Component<AllProps> {
  render() {
    return (
        <Header style={{ height: headerHeight + statusBarHeight }}>
        <Left style={{ marginTop: statusBarHeight }}>
          <Button
            transparent={true}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body style={{ marginTop: statusBarHeight }}>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
