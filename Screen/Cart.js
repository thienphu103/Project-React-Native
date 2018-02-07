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
  ToastAndroid,
  RefreshControl
} from 'react-native';

import flatListData from '../FlatlistData/flatListData';
import { firebaseApp } from '../Config/firebase';
export default class Cart extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Cart',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../image/icon-cart.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  }
  constructor(props) {
    super(props)
    FirebaseDB = firebaseApp.database();
    const { navigate } = this.props.navigation;
    const item = [];
    this.state = {
      email: '',
      password: '',
      number: '',
      price: '',
    }

  }
  componentWillMount() {

    FirebaseDB.ref('Bill').on('value', (spap) => {
      item = [];
      spap.forEach((data) => {
        item.push({
          key: data.key,
          data: data.val(),
        });
        this.setState({
          item: item,
          loading: true,
          number: '0',
          price:'0',
      
        });

        // 
        // ToastAndroid.show('Loading...', ToastAndroid.SHORT);
      });
    });
  }
  Add = () => {
    alert('Adding...');
    this.props.navigation.navigate('FormAdd')
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
  
  }
  CheckOut = () => {
    alert('Check Out Ok!!!\nThanks For Buy ^^')
   
  }
  

  render() {

    return (

      <View style={{ backgroundColor: 'white', flex: 1, }} >
        <View style={styles.header}>
          <Text style={styles.input}> Shopping Cart </Text>

        </View >



        <Text style={{ fontSize: 14, margin: 10, }}>
          {'Item: ' + this.state.number}
        </Text>

        <Text style={{ fontSize: 14, margin: 10, color: 'red', position: 'absolute', top: 60, right: 30, }}>
          {'Order Total: ' + this.state.price + ' VND'}
        </Text>

        <TouchableOpacity style={styles.AddinputButton}
          onPress={this.CheckOut}>
          <Text style={styles.AddsubmitButtonText}> CHECK OUT  </Text>
        </TouchableOpacity>
        <ScrollView >

          <View style={{ flex: 1, marginBottom: 100, marginTop: 10 }}>
            <FlatList
              data={item}
              // extraData={item}
              // ListEmptyComponent={this.RenderNull}
              // // refreshing={
             

              // // onRefresh={this.Show}
              renderItem={({ item, index }) => {
                console.log(`Price =`+item.data.Price);
               

                //console.log(`Item = ${JSON.stringify(item)}`)}
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
      <View style={{ flexDirection: 'column', }}>
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

            <TouchableOpacity style={styles.inputButton}
              onPress={this.Show}>
              <Text style={styles.submitButtonText}> Share  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButtonShare}
              onPress={() => {
                alert('Remove Ok!!!');
                FirebaseDB.ref('Bill').child(this.props.item.key).remove();
              
              
              }}>
              <Text style={styles.submitButtonText}> X  </Text>
            </TouchableOpacity>

          </View>
        </View>
        <View style={{
          height: 1,
          backgroundColor: 'white'
        }}>
          <View style={{ borderWidth: 0.3, }} />
        </View>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#247bbe',
  },
  container: {
    marginTop: 100,

  },
  text: {
    fontSize: 20,

  },
  input: {
    fontWeight: 'bold',
    margin: 15,
    height: 30,
    fontSize: 20,
    color: 'white',

  },
  AddinputButton: {
    margin: 2,
    height: 40,
    backgroundColor: 'orange',


  },
  inputButton: {
    marginTop: 10,
    height: 23,
    width: 90,
    backgroundColor: '#247bbe',


  },
  inputButtonShare: {
    position: 'relative',
    bottom: -1,
    left: 95,
    bottom: 23,
    height: 23,
    width: 30,
    backgroundColor: 'red',
  },

  inputButtonDelete: {
    position: 'relative',
    top: -46,
    left: 160,
    bottom: 23,
    height: 23,
    width: 30,
    backgroundColor: 'red',

  },

  inputButtonUpdate: {
    position: 'relative',
    top: -69,
    left: 195,
    bottom: 23,
    height: 23,
    width: 30,
    backgroundColor: 'violet',

  },
  AddsubmitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: -10,
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
