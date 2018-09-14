import React, { Component } from 'react';
// import { View, Text, } from 'react-native';
import { TabNavigator } from 'react-navigation';

import ProductDetailMain from '../screens/ProductDetailMain';
import ProductDetailParam from '../screens/ProductDetailParam';
import ProductDetailComment from '../screens/ProductDetailComment';

import { SCREENS } from '../common/constants';
import ProductDetailTabBarComponent from '../components/ProductDetailTabBarComponent';
import { PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, STATUSBAR_HEIGHT, } from '../common/constants';

const RouteConfigs = {
  [SCREENS.ProductDetailMain]: {
    screen: ProductDetailMain,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.product,
      // tabBarIcon: ({ tintColor }) => <CustomIcon name="home" size={16} color={tintColor} />
    })
  },
  [SCREENS.ProductDetailParam]: {
    screen: ProductDetailParam,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.parameter,
      // tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
    })
  },
  [SCREENS.ProductDetailComment]: {
    screen: ProductDetailComment,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.comment,
      // tabBarIcon: ({ tintColor }) => <CustomIcon name="user" size={16} color={tintColor} />
    })
  }
};

const TabNavigatorConfig = {
  tabBarComponent: ProductDetailTabBarComponent,
  lazy: true,
  swipeEnabled: true,
  animationEnabled: false,
  initialRouteName: SCREENS.ProductDetailMain,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: PRIMARY_COLOR,
    inactiveTintColor: '#666',
    showIcon: false,
    upperCaseLabel: false,
    style: {
      // position: 'absolute',
      // zIndex: 401,
      // bottom: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 90,
      // left: 40,
      width: WINDOW_WIDTH - 80,
      height: 40,
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      padding: 0,
      margin: 0,
      borderTopWidth: 0,
    },
    indicatorStyle: {
      width: (WINDOW_WIDTH - 80) / 3,
      backgroundColor: PRIMARY_COLOR,
      padding: 0,
      margin: 0
    },
    tabStyle: {
      padding: 0,
      margin: 0,
      height: 40,
      width: (WINDOW_WIDTH - 80) / 3
    },
    labelStyle: {
      fontSize: 14,
      padding: 0,
      margin: 0
    },
    iconStyle: {
      padding: 0,
      margin: 0
    }
  }
};

const TabContainer = TabNavigator(RouteConfigs, TabNavigatorConfig);

export default TabContainer;
