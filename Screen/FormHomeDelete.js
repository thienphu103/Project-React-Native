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
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { firebaseApp } from '../Config/firebase';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import UpImage from './UpImage';

const storage = firebaseApp.storage()

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}.jpg`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}
export default class FormDelete extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.navigation.state.params.name,
      des: this.props.navigation.state.params.des,
      imageURL:this.props.navigation.state.params.image,
      price:this.props.navigation.state.params.price,
      key: this.props.navigation.state.params.key

    }
    
    FirebaseDB = firebaseApp.database();
    product = FirebaseDB.ref('Product')
  }

  alertItemName = (item) => {
    alert(item)
  }
  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.showImagePicker({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ imageURL: url }))
        .catch(error => console.log(error))
    })
  }


  CheckSubmit = () => {
    const { name } = this.state;
    const { des } = this.state;
    const { price } = this.state;
    const { imageURL } = this.state;
    const { key } = this.state;
    if (name == '' || price == ''|| des=='') {

      alert('Please Enter Characters In Form \n{Name:Description:Price} Not Null, Thanks !!!');
    } else {
      Alert.alert(
        'Remove',
        'Remove Product Name: ' + name + ' ?',
        [
        
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {
            FirebaseDB.ref('Product').child(key).remove();
            this.props.navigation.navigate('TabManager')
          }},
        ],
        { cancelable: false }
      )
    }
  }


  render() {
    return (
      <View style={styles.background}>
        <KeyboardAvoidingView behavior="padding" style={{
          width: '100%'
          , justifyContent: 'center',
        }}>
          <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.inputHeader}> {'Delete Product: '+this.state.name} </Text>

        </View >
            <View style={styles.image}>
              <Image
                // source={require('../image/image_icon.png')}
                source={{ uri: this.state.imageURL }}
                style={{ width: 100, height: 100, margin: 5, }}
              />

            </View>
            <View style={{ marginTop: 0, }}>
            {/* <TouchableOpacity style={styles.submitButtonAddImage}
                // onPress={() =>  this.login(this.state.email, this.state.password)
                onPress={ () => this._pickImage() }>
                <Text style={styles.submitButtonText}> Upload Image  </Text>
              </TouchableOpacity> */}
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Name"
                placeholderTextColor="#ffffff80"
                autoCapitalize="none"
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Price"
                placeholderTextColor="#ffffff80"
                autoCapitalize="none"
                value={this.state.price}
                onChangeText={price => this.setState({ price })}
              />
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Description"
                placeholderTextColor="#ffffff80"
                autoCapitalize="none"
                value={this.state.des}
                onChangeText={des => this.setState({ des })}
              />

              <TouchableOpacity style={styles.submitButton}
                // onPress={() =>  this.login(this.state.email, this.state.password)
                onPress={this.CheckSubmit}>
                <Text style={styles.submitButtonText}> Delete  </Text>
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
  header: {
    height: 60,
    backgroundColor: '#247bbe',
    position:'absolute',
    top:-100,
  },
  inputHeader: {
    fontWeight: 'bold',
    margin: 15,
    height: 30,
    fontSize: 20,
    color: 'white',
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
  submitButtonAddImage: {
    backgroundColor: '#247bbe',
    alignSelf: 'center',
    padding: 10,
    margin: 15,
    height: 40,
    width:150,
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
    marginTop: -30,
    alignItems: 'center',
  },
});
