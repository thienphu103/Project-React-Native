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
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ScrollView,
  Alert,
  ToastAndroid
} from 'react-native';

import flatListData from '../FlatlistData/flatListData';
import { firebaseApp } from '../Config/firebase';
export default class Home extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../image/icon-home.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  }
  constructor(props) {
    super(props)
    FirebaseDB = firebaseApp.database();
    bill = FirebaseDB.ref('Bill')
    const { navigate } = this.props.navigation;
    item = [];
    this.state = {
      email: '',
      password: '',

    }
  }
  componentWillMount() {
    FirebaseDB.ref('Product').on('value', (spap) => {
      item = [];
      spap.forEach((data) => {
        item.push({
          key: data.key,
          data: data.val(),
        });
        this.setState({
          item: item,
          loading: false,
        });
        // ToastAndroid.show('Loading...', ToastAndroid.SHORT);
      });
    });
  }
  Add = () => {
    alert('Adding...');
    this.props.navigation.navigate('FormAdd')
  }
  SignOut = () => {
    this.props.navigation.navigate('Login')
  }
  Update = () => {
    alert('Adding...');
    this.props.navigation.navigate('FormUpdate')
  }
  Delele = () => {
    alert('Key');
  }


  Show = () => {
    alert('ok')
    // console.log(this.item)
  }
  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, }} >
        <View style={styles.header}>
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="aMarket Search..."
            placeholderTextColor="#ffffff"
            autoCapitalize="none"

            onChangeText={email => this.setState({ email })} />
          <Image
            source={require('../image/icon-search.png')}
            style={{ position: "absolute", left: 290, top: 22, }}
          />

          <TouchableOpacity style={{ position: "absolute", left: 330, top: 24, }}

            onPress={() => {
              Alert.alert(
                'Logout',
                'Are You Sure Logout ???',

                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                ],
                { cancelable: false }
              )
            }}>
            <Image
              source={require('../image/icon-off.png')}
              

            />

          </TouchableOpacity>



        </View >
        <Image
          source={require('../image/admin-banner.jpg')}
          style={{ height: 60, width: 380, }}
        />

        {/* <TouchableOpacity style={styles.SignOutButton}
                  onPress={() => {
                    Alert.alert(
                      'Logout',
                      'Are You Sure Logout ???',

                      [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                      ],
                      { cancelable: false }
                    )
                  }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: 'blue', marginTop: 5, marginBottom: 10, textDecorationLine: "underline" }}>
                    Sign Out
            </Text>
                </TouchableOpacity> */}

        <TouchableOpacity style={styles.AddinputButton}
          onPress={this.Add}>
          <Text style={styles.AddsubmitButtonText}> Add  </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, margin: 10, }}>
          Top Product
          </Text>
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 100 }}>
            <FlatList
              data={item}
              renderItem={({ item, index }) => {
                console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                return (
                  <FlatListItem item={item} index={index} navigation={this.props.navigation}>
                  </FlatListItem>);
              }}
            >
            </FlatList>
          </View>

        </ScrollView>

      </View>

    );
  }
}

class FlatListItem extends Component {
  render() {

    return (
      <View style={{ flexDirection: 'column', borderBottomWidth: 1, }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <Image
            source={{ uri: this.props.item.data.ImageURL }}
            style={{ width: 100, height: 100, margin: 5, }}
          >
          </Image>
          <View style={{ height: 100 }}>
            <Text style={{ fontWeight: 'bold', color: '#000000' }}>{this.props.item.data.Name}</Text>
            <Text style={styles.flatListItem}>{this.props.item.data.Description}</Text>
            <Text style={{ color: 'red', fontSize: 16, marginTop: 10, }}>{this.props.item.data.Price}</Text>

            {/* <TouchableOpacity style={styles.inputButton}
              onPress={() => {
                bill.push({
                  Name: this.props.item.data.Name,
                  Price: this.props.item.data.Price,
                  Description: this.props.item.data.Description,
                  ImageURL: this.props.item.data.ImageURL,
                }, () => alert('Add Product ' + this.props.item.data.Name + ' To Cart Ok'))
              }}>
              <Text style={styles.submitButtonText}> Add To Cart  </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.inputButtonShare}
              onPress={() => this.Show}>
              <Text style={styles.submitButtonText}> Share  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButtonDelete}
              onPress={() => {
                this.props.navigation.navigate('FormUpdate',
                  {
                    key: this.props.item.key,
                    name: this.props.item.data.Name,
                    des: this.props.item.data.Description,
                    image: this.props.item.data.ImageURL,
                    price: this.props.item.data.Price
                  })
              }}>
              <Text style={styles.submitButtonText}> Edit  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButtonUpdate}
              onPress={() => {
                this.props.navigation.navigate('FormHomeDelete',
                  {
                    key: this.props.item.key,
                    name: this.props.item.data.Name,
                    des: this.props.item.data.Description,
                    image: this.props.item.data.ImageURL,
                    price: this.props.item.data.Price
                  })
              }}>
              <Text style={styles.submitButtonText}>X</Text>
            </TouchableOpacity>


          </View>
        </View>
        <View style={{
          height: 1,
          backgroundColor: 'white'
        }}>
          {/* <View style={{ borderWidth: 0.3, }} /> */}
        </View>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#247bbe',
  },
  container: {
    marginTop: 100,

  },
  text: {
    fontSize: 20,

  },
  input: {
    margin: 15,
    width: 310,
    height: 40,
    backgroundColor: '#3e8ac880',
    color: 'white',

  },
  AddinputButton: {
    margin: 5,
    height: 23,
    backgroundColor: 'green',


  },

  SignOutinputButton: {

    height: 30,



  },

  inputButtonShare: {
    marginTop: 10,
    height: 23,
    width: 90,
    backgroundColor: '#247bbe',

  },
  SignOutButton: {
    marginTop: 10,
    height: 23,
    width: 90,
    alignSelf: 'center',
    alignItems: 'center',


  },

  inputButtonDelete: {
    position: 'relative',
    top: -23,
    left: 95,
    bottom: 23,
    height: 23,
    width: 45,
    backgroundColor: 'violet',

  },

  inputButtonUpdate: {
    position: 'relative',
    top: -46,
    left: 145,
    bottom: 23,
    height: 23,
    width: 30,
    backgroundColor: 'red',

  },
  AddsubmitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: -1,
  },

  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: -1,
  },
  icon: {
    width: 15,
    height: 15,
  },
});
