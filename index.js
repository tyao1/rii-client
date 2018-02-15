import { AppRegistry } from 'react-native';
import App from './App';
AppRegistry.registerComponent('riiclient', () => App);


import Navigation from './services/Navigation';
import Home from './components/Home';
import Gamepad from './components/Gamepad';
Navigation.register('Home', Home);
Navigation.register('Gamepad', Gamepad);
Navigation.push('Home');
