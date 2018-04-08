import { StackNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
import ProductDetail from '../screens/ProductDetail';
import Login from '../screens/Login';
import RegisterStepOne from '../screens/RegisterStepOne';
import RegisterStepTwo from '../screens/RegisterStepTwo';
import SearchResult from '../screens/SearchResult';
import MyCollection from '../screens/MyCollection';
import { SCREENS } from '../common/constants';

const RouteConfigs = {
  [SCREENS.Index]: {
    screen: AppTabNavigator,
    navigationOptions: {
      headerLeft: null
    }
  },
  [SCREENS.ProductDetail]: {
    screen: ProductDetail,
    navigationOptions: {
      headerLeft: null
    }
  },
  [SCREENS.Login]: {
    screen: Login,
    navigationOptions: {
      headerLeft: null
    }
  },
  [SCREENS.RegisterStepOne]: {
    screen: RegisterStepOne,
    navigationOptions: {
      headerLeft: null
    }
  },
  [SCREENS.RegisterStepTwo]: {
    screen: RegisterStepTwo,
    navigationOptions: {
      headerLeft: null
    }
  },
  [SCREENS.SearchResult]: {
    screen: SearchResult,
    navigationOptions: {
      headerLeft: null
    }
  },
  [SCREENS.MyCollection]: {
    screen: MyCollection,
    navigationOptions: {
      headerLeft: null
    }
  }
};

const StackNavigatorConfig = {
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
};

export default StackNavigator(RouteConfigs, StackNavigatorConfig);
