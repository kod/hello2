import { Dimensions } from "react-native";
import { StackNavigator, TabNavigator } from 'react-navigation';

import Category from '../Category';
import Main from '../Main';
import Feedback from '../Feedback';
import About from '../About';

const TabContainer = TabNavigator(
  {
    Main: { screen: Main },
    Category: { screen: Category },
    Feedback: { screen: Feedback },
    About: { screen: About }
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

const App = StackNavigator(
  {
    Home: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    }
  }
);

export default App;