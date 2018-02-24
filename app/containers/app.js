import { Dimensions } from "react-native";
import { StackNavigator, TabNavigator } from 'react-navigation';

// import Splash from '../pages/Splash';
import CategoryContainer from '../containers/CategoryContainer';
import MainContainer from '../containers/MainContainer';
// import WebViewPage from '../pages/ItemDetail/WebViewPage';
import Feedback from '../pages/Feedback/Feedback';
import About from '../pages/About/About';


const TabContainer = TabNavigator(
  {
    Main: { screen: MainContainer },
    Category: { screen: CategoryContainer },
    Feedback: { screen: Feedback },
    About: { screen: About }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    // initialLayout: {
    //   height: 40,
    //   width: Dimensions.get('window').width,
    // },
    tabBarOptions: {
      // scrollEnabled: true,
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
        // backgroundColor: '#f00'
      },
      labelStyle: {
        // padding: 0,
        margin: 0,
        fontSize: 12,
        // backgroundColor: '#f00'
      },
      iconStyle: {
        padding: 0,
        margin: 0,
        // backgroundColor: '#ff0'
      }
    }
  }
);

const App = StackNavigator(
  {
    // Splash: { screen: Splash },
    // Category: {
    //   screen: CategoryContainer,
    //   navigationOptions: {
    //     headerLeft: null
    //   }
    // },
    Home: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    },
    // Web: { screen: WebViewPage }
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
