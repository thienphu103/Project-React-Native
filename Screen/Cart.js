/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image
} from 'react-native';


export default class Cart extends Component{
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Cart',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../image/icon-cart.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',

    }
  }
  render() {
    return (
      <View style={styles.background}>
      <Text>
        This is a tab cart.
        </Text>
      </View >


    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    marginTop: 100,

  },

  icon: {
    width: 15,
    height: 15,
  },
});