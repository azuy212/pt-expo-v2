import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title, Item, Input, Text } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { StatusBar, StyleSheet } from 'react-native';

import { headerHeight } from '../theme/header';

const statusBarHeight = StatusBar.currentHeight || 0;

interface IProps {
  title: string;
  isVideoAvailable?: boolean;
  videoIconPress?: () => void;
  enableSearch?: boolean;
}

type AllProps = IProps & NavigationScreenProps;

interface IState {
  enableSearch: boolean;
}

export default class HeaderComponent extends Component<AllProps, IState> {
  state = {
    enableSearch: false,
  };

  enableSearch = () => {
    this.setState({ enableSearch: true });
  }

  disableSearch = () => {
    this.setState({ enableSearch: false });
  }

  render() {
    return this.state.enableSearch ? (
      <Header
        style={{ height: headerHeight + statusBarHeight, paddingTop: statusBarHeight }}
        searchBar={true}
        rounded={true}>
        <Item>
          <Icon name='ios-search' />
          <Input placeholder='Search' />
          <Icon name='md-close-circle' onPress={this.disableSearch} />
        </Item>
        <Button transparent={true}>
          <Text>Search</Text>
        </Button>
      </Header>
    ) : (
      <Header style={{ height: headerHeight + statusBarHeight }}>
        <Left style={styles.header}>
          <Button transparent={true} onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body style={styles.headerTitle}>
          <Title>{this.props.title}</Title>
        </Body>
        <Right style={styles.header}>
          <Icon
            name={this.props.isVideoAvailable ? 'play-circle-outline' : 'search'}
            type='MaterialIcons'
            style={styles.iconRight}
            onPress={this.props.isVideoAvailable ? this.props.videoIconPress : this.enableSearch}
          />
        </Right>
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
