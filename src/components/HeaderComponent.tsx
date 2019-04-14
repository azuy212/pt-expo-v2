import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { StatusBar, StyleSheet } from 'react-native';

import { headerHeight } from '../theme/header';

const statusBarHeight = StatusBar.currentHeight || 0;

interface IProps {
  title: string;
  isVideoAvailable?: boolean;
  videoIconPress?: () => void;
}

type AllProps = IProps & NavigationScreenProps;

export default class HeaderComponent extends Component<AllProps> {
  render() {
    return (
      <Header style={{ height: headerHeight + statusBarHeight }}>
        <Left style={styles.header}>
          <Button transparent={true} onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body style={styles.headerTitle}>
          <Title>{this.props.title}</Title>
        </Body>
        {this.props.isVideoAvailable ? (
          <Right style={styles.header}>
            <Icon
              name='play-video'
              type='Foundation'
              style={styles.iconRight}
              onPress={this.props.videoIconPress}
            />
          </Right>
        ) : (
          <Right />
        )}
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: statusBarHeight,
  },
  headerTitle: {
    flex: 3,
    marginTop: statusBarHeight,
    marginLeft: 10,
  },
  iconRight: {
    fontSize: 30,
    color: 'white',
    marginRight: 8,
  },
});
