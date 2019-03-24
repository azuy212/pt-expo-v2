import React from 'react';
import { AppRegistry, Image, StatusBar } from 'react-native';
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
const routes = ['Home', 'Chat', 'Profile', 'Settings', 'SignOut'];

const imageUri =
  'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets';

import background from '../../images/background.png';
import { Auth } from 'aws-amplify';

export default class SideBar extends React.Component<DrawerItemsProps, any> {
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log('Sign out complete');
        this.props.navigation.navigate('Authloading');
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
                    data === 'SignOut'
                      ? this.signOut()
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
