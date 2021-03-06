import { TabNavigator } from 'react-navigation';

import CouponMyItem from '../components/CouponMyItem';
import { SCREENS } from '../common/constants';

import { PRIMARY_COLOR } from '../styles/variables';

// import CustomIcon from '../components/CustomIcon';

const TabContainer = TabNavigator(
  {
    [SCREENS.CouponMyUnused]: {
      screen: CouponMyItem,
      navigationOptions: ({ screenProps: { i18n, couponMyUnused } }) => ({
        tabBarLabel: `${i18n.notUsed}(${couponMyUnused})`,
        // tabBarIcon: ({ tintColor }) => <CustomIcon name="home" size={15} color={tintColor} />
      }),
    },
    [SCREENS.CouponMyUsed]: {
      screen: CouponMyItem,
      navigationOptions: ({ screenProps: { i18n, couponMyUsed } }) => ({
        tabBarLabel: `${i18n.used}(${couponMyUsed})`,
        // tabBarIcon: ({ tintColor }) => <CustomIcon name="classify" size={16} color={tintColor} />
      }),
    },
    [SCREENS.CouponMyPast]: {
      screen: CouponMyItem,
      navigationOptions: ({ screenProps: { i18n, couponMyPast } }) => ({
        tabBarLabel: `${i18n.expired}(${couponMyPast})`,
        // tabBarIcon: ({ tintColor }) => <CustomIcon name="card" size={14} color={tintColor} />
      }),
    },
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
    },
  },
);

export default TabContainer;
