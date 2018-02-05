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

export default class FormAdd extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      des: '',
      imageURL:'https://png.icons8.com/ios/2x/xlarge-icons-filled.png',
      price:'',
    
    }
    FirebaseDB = firebaseApp.database();
    product=FirebaseDB.ref('Product')
  }

  alertItemName = (item) => {
    alert(item)
  }



  CheckSubmit = () => {
    const { name } = this.state;
    const { des } = this.state;
    const { price } = this.state;
    const { imageURL } = this.state;
    if (name == '' || price == '') {

      alert('Please Enter Name & Price, Thanks !!!');
    }  else {
       product.push({
            Name:this.state.name,
            Price:this.state.price,
            Description:this.state.des,
            ImageURL:this.state.imageURL,
       },()=> alert("Add Ok"))


      this.props.navigation.navigate('TabManager')       
    }
  }
  

  render() {
    return (
      <View style={styles.background}>
       <KeyboardAvoidingView behavior="padding" style={{width: '100%'  
       , justifyContent: 'center',}}>
        <View style={styles.container}>
       
          <View style={styles.image}>
            <Image
              // source={require('../image/image_icon.png')}
              source={{ uri:this.state.imageURL }}
              style={{ width: 100, height: 100, margin: 5, }}
            />

          </View>
          <View style={{ marginTop: 0, }}>
          <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="imageURL"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={imageURL => this.setState({ imageURL })} 
              />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Name"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={name => this.setState({ name })} 
              />
              <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Price"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={price => this.setState({ price })} 
              />
              <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Description"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={des => this.setState({ des })} 
              />
           
            <TouchableOpacity style={styles.submitButton}
              // onPress={() =>  this.login(this.state.email, this.state.password)
              onPress={this.CheckSubmit}>
              <Text style={styles.submitButtonText}> Add  </Text>
            </TouchableOpacity>
            

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

  checkImageButton: {
    height: 23,
    backgroundColor: '#f1c65c',
    alignSelf: 'center',
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
    marginTop: -80,
    alignItems: 'center',
  },
});