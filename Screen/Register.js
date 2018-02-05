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
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { firebaseApp } from '../Config/firebase';

export default class Register extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      repassword: '',

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
  CheckRegister = () => {
    const { email } = this.state;
    const { password } = this.state;
    const { repassword } = this.state;
    if (email == '' || password == '' || password != repassword) {

      alert('Please Enter Email & Password & Confirm Password Fail , Thanks !!!');
    } else {
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert('Register OK , Thanks !!!');
          this.props.navigation.navigate('Login')
        })
        .catch(function (error) {
          alert('Register Fail ,\n'+error);
        });

    }
  }
  render() {
    return (
      
      <View style={styles.background}>
         <KeyboardAvoidingView behavior="padding" style={{width: '100%'  
       ,height:'100%', justifyContent: 'center',}}>
        <View style={styles.container}>
       
          <View style={styles.image}>
            <Image
              source={require('../image/logo_edit_1.png')}
              style={{ alignItems: 'center' }}
            />
          
          </View>
         
         {/* <KeyboardAvoidingView behavior="padding" style={{flex:1,width:'100%'}}>
         </KeyboardAvoidingView> */}
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

            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={repassword => this.setState({ repassword })} 
             />
            <TouchableOpacity style={styles.submitButton}
              // onPress={() =>  this.login(this.state.email, this.state.password)
              onPress={this.CheckRegister}>
              <Text style={styles.submitButtonText}> Register  </Text>
            </TouchableOpacity>
            <Text style={styles.textForgotPass}>
              Forgot your login details? Get help signing in.
            </Text>
          </View>

        </View >
        </KeyboardAvoidingView>
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
    marginTop: -50,
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
