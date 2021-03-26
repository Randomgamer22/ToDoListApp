import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';;


export default class App extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  HomeScreen: {screen: HomeScreen}
})

const AppContainer = createAppContainer(switchNavigator);
