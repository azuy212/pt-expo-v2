import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { StatusBar } from 'react-native';

import { headerHeight } from '../theme/header';

interface Props {
  title: string;
}

type AllProps = Props & NavigationScreenProps;

export default class HeaderComponent extends Component<AllProps> {
  render() {
    return (
        <Header style={{ marginTop: StatusBar.currentHeight, height: headerHeight }}>
        <Left>
          <Button
            transparent={true}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
