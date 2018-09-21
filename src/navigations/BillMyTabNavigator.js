import { TabNavigator } from 'react-navigation';

import BillMyItem from '../components/BillMyItem';
import { SCREENS } from '../common/constants';

import {
  FONT_COLOR_THIRD,
  BACKGROUND_COLOR_THIRD,
  FONT_COLOR_PRIMARY,
  BACKGROUND_COLOR_PRIMARY,
} from '../styles/variables';

const TabContainer = TabNavigator(
  {
    [SCREENS.BillCurrent]: {
      screen: BillMyItem,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: `${i18n.currentBill}`,
      }),
    },
    [SCREENS.BillOut]: {
      screen: BillMyItem,
      navigationOptions: ({ screenProps: { i18n } }) => ({
        tabBarLabel: `${i18n.outBill}`,
      }),
    },
    [SCREENS.BillOverdue]: {
      screen: BillMyItem,
      navigationOptions: ({ screenProps: { i18n, bill5 } }) => ({
        tabBarLabel: `${i18n.overdueBill}(${bill5.length})`,
      }),
    },
  },
  {
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: SCREENS.BillCurrent,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: FONT_COLOR_PRIMARY,
      inactiveTintColor: FONT_COLOR_THIRD,
      showIcon: false,
      upperCaseLabel: false,
      style: {
        backgroundColor: BACKGROUND_COLOR_THIRD,
        // height: 55,
        // padding: 0,
        // margin: 0,
        // elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: BACKGROUND_COLOR_PRIMARY,
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
