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

export default class Account extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Account',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../image/icon-user.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  }
  constructor(props) {
    super(props)
    FirebaseDB = firebaseApp.database();

    const { navigate } = this.props.navigation;
 
    this.state = {
      email: '',
      password: '',
      user: 'Customer',
      item :[],
    }


  }
  componentWillMount() {
    FirebaseDB.ref('Account').on('value', (spap) => {
      item = [];
      spap.forEach((data) => {
        item.push({
          key: data.key,
          data: data.val(),
        });
        this.setState({
          item: item, 
          loading: false,
          // user:JSON.parse(item.data.key),
        });
         
        // ToastAndroid.show('Loading...', ToastAndroid.SHORT);
      });
    });
  }


  render() {

    return (

      <View style={styles.background}>
        <View>
          <KeyboardAvoidingView behavior="padding" style={{
            width: '100%'
            , height: '100%', justifyContent: 'center',
          }}>
            <View style={styles.container}>

              <View style={styles.image}>
                <Image
                  source={require('../image/icon-profile.png')}
                  style={{ alignItems: 'center', marginTop: 30, }}
                />
                <Text style={{ fontSize: 20, color: 'white', marginTop: 20, fontWeight: 'bold' }}>
                  {this.state.user}
                </Text>


                <TouchableOpacity style={styles.inputButtonShare}
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
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: 'white', marginTop: 5, marginBottom: 10, textDecorationLine: "underline" }}>
                    Sign Out
            </Text>
                </TouchableOpacity>


              </View>

              <FlatList style={{ marginTop: 10 }}
                data={item}
                renderItem={({ item }) => {
                  console.log(`Item = ${JSON.stringify(item)}`);
                  return (
                    <FlatListItem item={item} navigation={this.props.navigation}>
                    </FlatListItem>
                   
                  );
                    
                }}
              >
              </FlatList>
            </View>
          </KeyboardAvoidingView>
        </View >
      </View >

    );
  }
}
class FlatListItem extends Component {
  render() {
    
    return (

      <View style={styles.containerFlatlist}>
        <Image
          source={{ uri: this.props.item.data.Image }}
          style={{ width: 50, height: 50, marginLeft: 10, marginRight: 10, marginTop: 10 }}
        >
        </Image>
        <Text style={styles.item}>{this.props.item.data.Email}</Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  background: {

    backgroundColor: '#ffffff80',
  },
  container: {
    marginTop: -80,
  },

  image: {
    marginTop: 50,

    alignItems: 'center',
    backgroundColor: '#247bbe',
  },
  icon: {
    width: 15,
    height: 15,
  },
  containerFlatlist: {
    backgroundColor: '#ffffff',
    marginLeft: 30,
    marginRight: 30,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff10',
    marginTop: 5,
  },
  item: {
    position: 'relative',
    left: 70,
    top: -35,
    fontSize: 14,
  }
});
