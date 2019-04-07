import React from 'react';
import { Image, Alert } from 'react-native';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Label,
} from 'native-base';
import { DrawerItemsProps } from 'react-navigation';
const routes = [
{ label: 'Home', icon: 'home' },
{ label: 'Chat', icon: 'chatboxes' },
{ label: 'Profile', icon: 'person' },
{ label: 'Settings', icon: 'settings' },
{ label: 'Sign Out', icon: 'log-out' },
];

import background from '../images/background.png';
import { Auth } from 'aws-amplify';

export default class SideBar extends React.Component<DrawerItemsProps, any> {
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.signOut() },
      ],
      { cancelable: false },
    );
  }
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log('Sign out complete');
        this.props.navigation.navigate('AuthLoading');
      })
      .catch(err => console.log('Error while signing out!', err));
  }
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={background}
            style={{
              height: 120,
              width: '100%',
              alignSelf: 'stretch',
              position: 'absolute',
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={(data: {label: string, icon: string}) => {
              return (
                <ListItem
                  button={true}
                  onPress={() => {
                    data.label === 'Sign Out'
                      ? this.signOutAlert()
                      : this.props.navigation.navigate(data.label);
                  }}
                >
                  <Icon name={data.icon} style={{ marginRight: 10 }} />
                  <Text>{data.label}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
