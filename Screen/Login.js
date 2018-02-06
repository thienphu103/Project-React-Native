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
import { firebaseApp } from '../Config/firebase';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    
    }
  }
  // handleEmail = (text) => {
  //   this.setState({ email: text })
  // }
  // handlePassword = (text) => {
  //   this.setState({ password: text })
  // }
  // login = (email, pass) => {
  //   alert('email : ' + email + '| password: ' + pass)
  // }

  alertItemName = (item) => {
    alert(item)
  }
  CheckLogin = () => {
    const { email } = this.state;
    const { password } = this.state;
   
    if (email == '' || password == '') {

      alert('Please Enter Email & Password, Thanks !!!');
    } else {

      if (email == '' || password == '') {

        alert('Please Enter Email & Password & Confirm Password Fail , Thanks !!!');
      } else {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
           
            alert('Login email: ' + email + ' OK. Thanks !!!');
           
            this.props.navigation.navigate('TabManager',{user:email})
          })
          .catch(function (error) {
            alert('Login Fail ,\n' + error);
          });
      }
    }
  }
  ClickRegister = () => {

    // alert('Login Complete !!!')
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>

          <View style={styles.image}>
            <Image
              source={require('../image/logo_edit_1.png')}
              style={{ alignItems: 'center' }}
            />

          </View>
          <View style={{ marginTop: 50, }}>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })} 
              />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })} 
              />
            <TouchableOpacity style={styles.submitButton}
              // onPress={() =>  this.login(this.state.email, this.state.password)
              onPress={this.CheckLogin}>
              <Text style={styles.submitButtonText}> Login  </Text>
            </TouchableOpacity>
            <Text style={styles.textForgotPass}>
              Forgot your login details? Get help signing in.
            </Text>
          </View>
          <Text style={styles.textOr}> ──────────────────────  OR  ──────────────────────</Text>

          <View style={{ alignItems: 'center', }}>
            <Text style={styles.textLoginFB}>
              Log In With Facebook.
            </Text>
            <Image
              source={require('../image/icon.png')}
              style={{ position: "relative", left: -70, bottom: 19, width: 20, height: 20 }} />
          </View>

        </View >
        <View style={styles.footer}>

          <TouchableOpacity
            // onPress={() =>  this.login(this.state.email, this.state.password)
            onPress={this.ClickRegister}>
            <Text style={styles.textSignUp}>
              Don't have an account? Sign Up.
            </Text>
          </TouchableOpacity>

        </View>
      </View >


    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#247bbe',
  },
  container: {
    marginTop: 100,

  },
  footer: {
    marginTop: 20,
    height: 80,
    backgroundColor: '#388dd0',
    borderColor: '#ffffff',
    borderTopWidth: 0.3,
  },
  input: {
    margin: 15,
    height: 40,
    backgroundColor: '#3e8ac880',
    color: 'white',

  },
  submitButton: {
    backgroundColor: '#247bbe',
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: '#ffffff30',
    borderWidth: 1,
    alignItems: 'center',
  },

  submitButtonText: {
    color: 'white',

  },

  textForgotPass: {
    color: 'white',
    fontSize: 10,

    alignSelf: 'center',
  },
  textOr: {
    color: 'white',
    fontSize: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  textLoginFB: {
    marginTop: 20,
    color: 'white',
    fontSize: 13,
    marginLeft: 30,
    fontWeight: 'bold',

  },
  textSignUp: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    fontStyle: 'normal',
    flexDirection: 'column',


  },
  image: {
    marginTop: -30,
    alignItems: 'center',
  },
});
