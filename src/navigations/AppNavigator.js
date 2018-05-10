import { StackNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
import { SCREENS } from '../common/constants';
import ProductDetail from '../screens/ProductDetail';
import Login from '../screens/Login';
import RegisterStepOne from '../screens/RegisterStepOne';
import RegisterStepTwo from '../screens/RegisterStepTwo';
import SearchResult from '../screens/SearchResult';
import MyCollection from '../screens/MyCollection';
import Settings from '../screens/Settings';
import Language from '../screens/Language';
import RegisterFastStepOne from '../screens/RegisterFastStepOne';
import RegisterFastStepTwo from '../screens/RegisterFastStepTwo';
import ForgotPasswordOne from '../screens/ForgotPasswordOne';
import ForgotPasswordTwo from '../screens/ForgotPasswordTwo';
import Test from '../screens/Test';

const RouteConfigs = {
  [SCREENS.Index]: {
    screen: AppTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.ProductDetail]: {
    screen: ProductDetail,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.Login]: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.RegisterStepOne]: {
    screen: RegisterStepOne,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.RegisterStepTwo]: {
    screen: RegisterStepTwo,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.SearchResult]: {
    screen: SearchResult,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.MyCollection]: {
    screen: MyCollection,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.Settings]: {
    screen: Settings,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.Language]: {
    screen: Language,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.RegisterFastStepOne]: {
    screen: RegisterFastStepOne,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.RegisterFastStepTwo]: {
    screen: RegisterFastStepTwo,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.ForgotPasswordOne]: {
    screen: ForgotPasswordOne,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.ForgotPasswordTwo]: {
    screen: ForgotPasswordTwo,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Test]: {
    screen: Test,
    navigationOptions: {
      header: null,
    }
  }
};

const StackNavigatorConfig = {
  initialRouteName: SCREENS.Index,
  // initialRouteName: SCREENS.ProductDetail,
  // initialRouteName: SCREENS.Test,
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

const AppNavigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default AppNavigator;
