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
    this.state = {
      email: '',
      password: '',
      user: 'usercustomer@gmail.com',
    }


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

                <Text style={{ fontSize: 14, color: 'white', marginTop: 5, marginBottom: 10, }}>
                  Customer
            </Text>

              </View>

              <FlatList style={{marginTop:10}}
                data={[
                  { key: 'Name: Thiện Phú', image:'https://caravetclinic.com/wp/wp-content/uploads/2016/07/person-icon-blue.png' },
                  { key: 'Phone: 01235073266',image: 'https://images.vexels.com/media/users/3/140965/isolated/preview/a945eef28564ae85fff5ac18adf637d9-phone-round-icon-by-vexels.png' },
                  { key: 'Email: usercustomer@gmail.com',image:'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-1/254000/67-512.png' },
                  { key: 'Address: Q 3, TP: HCM',image:'https://cdn1.iconfinder.com/data/icons/ui-5/502/address-512.png' },
                  
                ]}
                renderItem={({ item }) =>
                  <View style={styles.containerFlatlist}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 50, height: 50, marginLeft:10,marginRight:10,marginTop:10}}
                    >
                    </Image>
                    <Text style={styles.item}>{item.key}</Text>
                  </View>



                }
              />
            </View>
          </KeyboardAvoidingView>
        </View >
      </View >

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
  containerFlatlist:{
    backgroundColor: '#ffffff',
    marginLeft: 30,
    marginRight: 30,
    height:70,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff10',
    marginTop: 5,
  },
  item:{
    position:'relative',
    left:70,
    top:-35,
    fontSize: 14,
   
  }
});
