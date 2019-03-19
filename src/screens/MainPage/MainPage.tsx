import React from 'react';
import { Header, Image } from 'react-native-elements';
import {
  View,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
// Components
import IconWithText from '../../components/IconWithTextComponent';
import logo from '../../images/logo.png';
// Screens
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import ChatScreen from './ChatScreen';

export type Screens = 'home' | 'profile' | 'settings';

interface State {
  currentScreen: Screens;
  activityStack: Screens[];
  backExitCounter: number;
}

export default class extends React.Component<NavigationScreenProps, State> {
  state = {
    currentScreen: 'home',
    activityStack: [],
    backExitCounter: 1,
  } as Pick<State, keyof State>;
  navigate = (destination: Screens) => {
    if (destination === this.state.currentScreen) return;
    this.setState(prevState => ({
      activityStack: [...prevState.activityStack, this.state.currentScreen],
      currentScreen: destination,
      backExitCounter: 1,
    }));
  }
  handleBackPress = () => {
    const lastScreen = this.state.activityStack.pop();
    if (lastScreen) {
      this.setState({
        activityStack: this.state.activityStack,
        currentScreen: lastScreen ? lastScreen : 'home',
      });
      return true;
    }
    if (this.state.backExitCounter > 0) {
      ToastAndroid.show('press again to exit', ToastAndroid.SHORT);
      this.setState({ backExitCounter: this.state.backExitCounter - 1 });
      return true;
    }
    return false;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleScreens = () => {
    switch (this.state.currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'profile':
        return <ProfileScreen navigate={this.navigate} />;
      case 'settings':
        return <SettingsScreen {...this.props} />;
    }
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <Header
          leftComponent={
            <IconWithText
              icon='menu'
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          centerComponent={
            <TouchableNativeFeedback onPress={() => this.navigate('home')}>
              <Image source={logo} style={{ width: 80, height: 50 }} />
            </TouchableNativeFeedback>}
          rightComponent={
            <IconWithText
              icon='person'
              onPress={() => this.navigate('profile')}
            />
          }
          containerStyle={styles.headBar}
          statusBarProps={{ hidden: false }}
        />
        <View style={styles.contentStyle}>{this.handleScreens()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
