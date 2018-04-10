
import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Category from '../screens/Category';
import Main from '../screens/Main';
import Cart from '../screens/Cart';
import Me from '../screens/Me';
import Login from '../screens/Login';
import { SCREENS } from '../common/constants';

const TabContainer = TabNavigator(
  {
    [SCREENS.Main]: { 
      screen: Main,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: i18n.home,
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={25} color={tintColor} />
      }),
     },
    // [SCREENS.Category]: { screen: Category },
    [SCREENS.Cart]: { 
      screen: Cart,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: i18n.cart,
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="shopping-cart" size={25} color={tintColor} />
      }),
     },
    [SCREENS.Me]: { screen: Me },
    // [SCREENS.Login]: { screen: Login },
  },
  {
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: SCREENS.Main,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff',
        height: 55
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0,
        margin: 0,
      },
      labelStyle: {
        margin: 0,
        fontSize: 12,
      },
      iconStyle: {
        padding: 0,
        margin: 0,
      }
    }
  }
);

export default TabContainer;