import { createDrawerNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen';
import MainPage from './MainPage';

const App = createDrawerNavigator({
  Home: {
    screen: MainPage,
  },
  Chat: {
    screen: ChatScreen,
  },
});

export default App;
