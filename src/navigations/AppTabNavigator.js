
import { TabNavigator } from 'react-navigation';

import Category from '../screens/Category';
import Main from '../screens/Main';
import Cart from '../screens/Cart';
import Me from '../screens/Me';
import { SCREENS } from '../common/constants';

const TabContainer = TabNavigator(
  {
    [SCREENS.Main]: { screen: Main },
    [SCREENS.Category]: { screen: Category },
    [SCREENS.Cart]: { screen: Cart },
    [SCREENS.Me]: { screen: Me }
  },
  {
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
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