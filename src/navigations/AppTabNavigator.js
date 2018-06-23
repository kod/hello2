import React from 'react';
import { TabNavigator } from 'react-navigation';

import Card from '../screens/Card';
import Main from '../screens/Main';
import Cart from '../screens/Cart';
import Me from '../screens/Me';
import Login from '../screens/Login';
import { SCREENS } from '../common/constants';

import CustomIcon from '../components/CustomIcon.js';

const TabContainer = TabNavigator(
  {
    [SCREENS.Main]: {
      screen: Main,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: i18n.home,
        tabBarIcon: ({ tintColor }) => <CustomIcon name="home" size={16} color={tintColor} />
      })
    },
    [SCREENS.Card]: {
      screen: Card,
      navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.card,
        tabBarIcon: ({ tintColor }) => <CustomIcon name="card" size={14} color={tintColor} />
      })
    },
    [SCREENS.Cart]: {
      screen: Cart,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: i18n.cart,
        tabBarIcon: ({ tintColor }) => <CustomIcon name="cart" size={17} color={tintColor} />
      })
    },
    [SCREENS.Me]: {
      screen: Me,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: i18n.me,
        tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
      })
    }
  },
  {
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: SCREENS.Main,
    // initialRouteName: SCREENS.Me,
    // initialRouteName: SCREENS.Card,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#0076F7',
      inactiveTintColor: '#999999',
      showIcon: true,
      upperCaseLabel: false,
      style: {
        backgroundColor: '#fff',
        height: 55,
        padding: 0,
        margin: 0
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0,
        margin: 0
      },
      labelStyle: {
        padding: 0,
        margin: 0,
        fontSize: 12
      },
      iconStyle: {
        padding: 0,
        margin: 0
      }
    }
  }
);

export default TabContainer;
