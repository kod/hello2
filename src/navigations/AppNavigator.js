import { StackNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
import ProductDetail from '../screens/ProductDetail';
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
