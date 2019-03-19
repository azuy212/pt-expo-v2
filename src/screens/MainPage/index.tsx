import { createDrawerNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen';
import MainPage from './MainPage';

const App = createDrawerNavigator({
  Chat: ChatScreen,
  Home: MainPage,
});

export default App;
