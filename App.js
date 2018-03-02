/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { StackNavigator, TabBarBottom } from 'react-navigation';
import Login from './Screen/Login';
import Register from './Screen/Register';
import TabManager from './Screen/TabManager';
import FormAdd from './Screen/FormAdd';
import FormUpdate from './Screen/FormUpdate';
import FormHomeDelete from './Screen/FormHomeDelete';
import FormCartDelete from './Screen/FormCartDelete';
import Home from './Screen/Home';
import Cart from './Screen/Cart';
import HomeGuest from './Screen/HomeGuest';

export default class App extends React.Component {


  render() {
    return (
      <AppNavigator />

    );
  }
}

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  TabManager: { screen: TabManager },
  Register: { screen: Register },
  FormAdd: { screen: FormAdd },
  FormUpdate: { screen: FormUpdate },
  FormHomeDelete: { screen: FormHomeDelete },
  FormCartDelete: { screen: FormCartDelete },
  Home: { screen: Home },
  HomeGuest: { screen: HomeGuest },
  Cart: { screen: Home },
  


});
