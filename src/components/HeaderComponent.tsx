import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { StatusBar, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

import SearchModal from './SearchModal';

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
    const { isVideoAvailable, videoIconPress, title, navigation } = this.props;
    return (
      <Header transparent={true} span={true}>
        <Left style={styles.header}>
          <Button transparent={true} onPress={() => navigation.openDrawer()}>
            <Icon style={{ color: 'black' }} name='menu' />
          </Button>
        </Left>
        <Body style={styles.headerTitle}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Home')}>
          <Image
            source={require('../images/logo.png')}
            style={{ height: 75, width: 100, marginRight: 20 }}
          />
        </TouchableOpacity>
        </Body>
        <Right style={styles.header}>
          <Icon
            name={isVideoAvailable ? 'play-circle-outline' : 'search'}
            type='MaterialIcons'
            style={styles.iconRight}
            onPress={isVideoAvailable ? videoIconPress : this.enableSearch}
          />
        </Right>
        <SearchModal
          visible={this.state.enableSearch}
          hideModal={this.disableSearch}
          {...this.props}
        />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  headerTitle: {
    flex: 3,
    marginTop: statusBarHeight,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {
    fontSize: 30,
    color: 'black',
    marginRight: 8,
  },
});
