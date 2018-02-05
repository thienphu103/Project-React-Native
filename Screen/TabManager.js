import { TabNavigator } from "react-navigation";

//import your tabs js file
import Login from './Login';
import Home from './Home';
import Cart from './Cart'
import Account from './Account'
var TabManager = TabNavigator({
  // here you will define your screen-tabs
  Home: { screen: Home },
  Cart: { screen: Cart },
  Account: { screen: Account },
},
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      labelStyle: {
        fontSize: 8,
      },
      tabStyle: {
        height: 50,
        backgroundColor: '#247bbe',
      },
      showIcon: true,

    }
  });

export default TabManager;