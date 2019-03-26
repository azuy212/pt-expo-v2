import React from 'react';
import { AppRegistry, Image, StatusBar, Alert } from 'react-native';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
} from 'native-base';
import { DrawerItemsProps } from 'react-navigation';
const routes = ['Home', 'Chat', 'Profile', 'Settings', 'Sign Out'];

const imageUri =
  'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets';

import background from '../../images/background.png';
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
            renderRow={(data) => {
              return (
                <ListItem
                  button={true}
                  onPress={() => {
                    data === 'Sign Out'
                      ? this.signOutAlert()
                      : this.props.navigation.navigate(data);
                  }}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
