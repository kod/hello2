import React from 'react';
import { TabNavigator } from 'react-navigation';

import CouponMyItem from '../screens/CouponMyItem';
import { SCREENS } from '../common/constants';

import { PRIMARY_COLOR } from "../styles/variables";

import CustomIcon from '../components/CustomIcon.js';

const TabContainer = TabNavigator(
  {
    [SCREENS.CouponMyUnused]: {
      screen: CouponMyItem,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: '未使用(15)',
        // tabBarIcon: ({ tintColor }) => <CustomIcon name="home" size={15} color={tintColor} />
      })
    },
    [SCREENS.CouponMyUsed]: {
      screen: CouponMyItem,
      navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: '已使用(0)',
        // tabBarIcon: ({ tintColor }) => <CustomIcon name="classify" size={16} color={tintColor} />
      })
    },
    [SCREENS.CouponMyPast]: {
      screen: CouponMyItem,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: '已过期(0)',
        // tabBarIcon: ({ tintColor }) => <CustomIcon name="card" size={14} color={tintColor} />
      })
    }
  },
  {
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: SCREENS.CouponMyUnused,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#0076F7',
      inactiveTintColor: '#999999',
      showIcon: false,
      upperCaseLabel: false,
      style: {
        backgroundColor: '#fff',
        // height: 55,
        // padding: 0,
        // margin: 0,
        // elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      // tabStyle: {
      //   padding: 0,
      //   margin: 0
      // },
      // labelStyle: {
      //   padding: 0,
      //   margin: 0,
      //   fontSize: 12
      // },
      // iconStyle: {
      //   padding: 0,
      //   margin: 0
      // }
    }
  }
);

export default TabContainer;
