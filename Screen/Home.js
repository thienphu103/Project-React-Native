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
  Alert
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
     item= [];
    this.state = {
      email: '',
      password: '',
     
    }
  }
  componentWillMount() {
    FirebaseDB.ref('Product').on('value', (spap) => {
      item= [];
      spap.forEach((data) => {
        item.push({
          key:data.key,
          data: data.val(),
        });
        this.setState({
          item: item,
          loading: false,
        });
      });
    });
  }
Add =()=>{
  alert('Adding...');
  this.props.navigation.navigate('FormAdd')    
}
Delele =()=>{
  alert('Key');    
}

  Show = () => {
    alert('ok')
    // console.log(this.item)
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white' }} >
        <View style={styles.header}>
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="aMarket Search..."
            placeholderTextColor="#ffffff"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })} />
          <Image
            source={require('../image/icon-search.png')}
            style={{ position: "absolute", left: 310, top: 22, }}
          />
        </View >

        <ScrollView >
          <Text>
            <Image
              source={require('../image/banner.png')}
            />
          </Text>
          <TouchableOpacity style={styles.AddinputButton}
              onPress={this.Add}>
              <Text style={styles.AddsubmitButtonText}> Add  </Text>
            </TouchableOpacity>
          <Text style={{ fontSize: 16, margin: 10, }}>
            Top Product


          </Text>

          <View style={{ flex: 1, marginBottom: 100 }}>
            <FlatList
              data={item}
              renderItem={({ item, index }) => {
                console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                return (
                  <FlatListItem item={item} index={index}>
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
      <View style={{

        flexDirection: 'column',

      }}>
        <View style={{

          flexDirection: 'row',
          // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
          backgroundColor: 'white'
        }}>

          <Image
            source={{ uri: this.props.item.data.ImageURL }}
            style={{ width: 100, height: 100, margin: 5, }}
          >
          </Image>
          <View style={{


            height: 100
          }}>
            <Text style={{fontWeight:'bold',color:'#000000'}}>{this.props.item.data.Name}</Text>
            <Text style={styles.flatListItem}>{this.props.item.data.Description}</Text>
            <Text style={{ color: 'red', fontSize: 16, marginTop: 10, }}>{this.props.item.data.Price}</Text>
           
            <TouchableOpacity style={styles.inputButton}
              onPress={this.Show}>
              <Text style={styles.submitButtonText}> Add To Cart  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButtonShare}
              onPress={this.Show}>
              <Text style={styles.submitButtonText}> Share  </Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.inputButtonDelete}
               onPress={() => {
                alert('Remove Product Key: '+this.props.item.key+' Ok!!!');
                FirebaseDB.ref('Product').child(this.props.item.key).remove();
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
    height: 40,
    backgroundColor: '#3e8ac880',
    color: 'white',

  },
  AddinputButton: {
    margin:5,
    height: 23,
    backgroundColor: '#f1c65c',


  },
  inputButton: {
    marginTop: 10,
    height: 23,
    width: 100,
    backgroundColor: '#f1c65c',


  },
  inputButtonShare: {
    position: 'relative',
    bottom: -1,
    left: 110,
    bottom: 23,
    height: 23,
    width: 70,
    backgroundColor: '#247bbe',

  },

  inputButtonDelete: {
    position: 'relative',
    top:-46,
    left: 190,
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