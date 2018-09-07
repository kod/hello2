import { TabNavigator } from 'react-navigation';

import PrepaidPhoneCard from '../screens/PrepaidPhoneCard';
import PrepaidRecharge from '../screens/PrepaidRecharge';
import PrepaidScratchCards from '../screens/PrepaidScratchCards';

import PrepaidTabBarComponent from '../components/PrepaidTabBarComponent';
import { PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, SCREENS } from '../common/constants';

const RouteConfigs = {
  [SCREENS.PrepaidRecharge]: {
    screen: PrepaidRecharge,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.recharge,
    }),
  },
  [SCREENS.PrepaidPhoneCard]: {
    screen: PrepaidPhoneCard,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.phoneCard,
    }),
  },
  [SCREENS.PrepaidScratchCards]: {
    screen: PrepaidScratchCards,
    navigationOptions: ({ screenProps: { i18n } }) => ({
      tabBarLabel: i18n.scratchCard,
    }),
  },
};

const TabNavigatorConfig = {
  tabBarComponent: PrepaidTabBarComponent,
  lazy: true,
  swipeEnabled: true,
  animationEnabled: false,
  initialRouteName: SCREENS.PrepaidRecharge,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: PRIMARY_COLOR,
    inactiveTintColor: '#666',
    showIcon: false,
    upperCaseLabel: false,
    style: {
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
      margin: 0,
    },
    tabStyle: {
      padding: 0,
      margin: 0,
      height: 40,
      width: (WINDOW_WIDTH - 80) / 3,
    },
    labelStyle: {
      fontSize: 14,
      padding: 0,
      margin: 0,
    },
    iconStyle: {
      padding: 0,
      margin: 0,
    },
  },
};

const TabContainer = TabNavigator(RouteConfigs, TabNavigatorConfig);

export default TabContainer;
