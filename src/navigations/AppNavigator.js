import { StackNavigator } from 'react-navigation';
import { SCREENS } from '../common/constants';
import Address from '../screens/Address';
import AddressAdd from '../screens/AddressAdd';
import AddressEdit from '../screens/AddressEdit';
import AppTabNavigator from './AppTabNavigator';
import Bill from '../screens/Bill';
import BillDetail from '../screens/BillDetail';
import BillingPeriodDetail from '../screens/BillingPeriodDetail';
import Categories from '../screens/Categories';
import CertifiedInformation from '../screens/CertifiedInformation';
import CertifiedInformationSchool from '../screens/CertifiedInformationSchool';
import CertifiedInformationContact from '../screens/CertifiedInformationContact';
import ForgotPasswordOne from '../screens/ForgotPasswordOne';
import ForgotPasswordTwo from '../screens/ForgotPasswordTwo';
import Language from '../screens/Language';
import Login from '../screens/Login';
import MyCollection from '../screens/MyCollection';
import Order from '../screens/Order';
import OrderWrite from '../screens/OrderWrite';
import Pay from '../screens/Pay';
import PeriodSelect from '../screens/PeriodSelect';
import ProductDetail from '../screens/ProductDetail';
import RegisterStepOne from '../screens/RegisterStepOne';
import RegisterStepTwo from '../screens/RegisterStepTwo';
import RegisterFastStepOne from '../screens/RegisterFastStepOne';
import RegisterFastStepTwo from '../screens/RegisterFastStepTwo';
import RepaymentRecord from '../screens/RepaymentRecord';
import SchoolSelect from '../screens/SchoolSelect';
import SearchResult from '../screens/SearchResult';
import SearchResultList from '../screens/SearchResultList';
import SecurityCenter from '../screens/SecurityCenter';
import Settings from '../screens/Settings';
import Test from '../screens/Test';
import TransactionPasswordStepOne from '../screens/TransactionPasswordStepOne';
import TransactionPasswordStepTwo from '../screens/TransactionPasswordStepTwo';
import ProductDetailImages from '../screens/ProductDetailImages';
import WebView from '../screens/WebView';
import Evalution from '../screens/Evalution';
import CateList from '../screens/CateList';
import Coupon from '../screens/Coupon';
import CouponMy from '../screens/CouponMy';
import QrCodeScanner from '../screens/QrCodeScanner';
import Prepaid from '../screens/Prepaid';

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
  [SCREENS.Pay]: {
    screen: Pay,
    navigationOptions: {
      header: null
    }
  },
  [SCREENS.OrderWrite]: {
    screen: OrderWrite,
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
  },
  [SCREENS.Address]: {
    screen: Address,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.AddressAdd]: {
    screen: AddressAdd,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.AddressEdit]: {
    screen: AddressEdit,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.CertifiedInformation]: {
    screen: CertifiedInformation,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.CertifiedInformationSchool]: {
    screen: CertifiedInformationSchool,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.CertifiedInformationContact]: {
    screen: CertifiedInformationContact,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.SchoolSelect]: {
    screen: SchoolSelect,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.TransactionPasswordStepOne]: {
    screen: TransactionPasswordStepOne,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.TransactionPasswordStepTwo]: {
    screen: TransactionPasswordStepTwo,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.ProductDetailImages]: {
    screen: ProductDetailImages,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.WebView]: {
    screen: WebView,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Bill]: {
    screen: Bill,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.BillDetail]: {
    screen: BillDetail,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.BillingPeriodDetail]: {
    screen: BillingPeriodDetail,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.RepaymentRecord]: {
    screen: RepaymentRecord,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Order]: {
    screen: Order,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.PeriodSelect]: {
    screen: PeriodSelect,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.SecurityCenter]: {
    screen: SecurityCenter,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Evalution]: {
    screen: Evalution,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Categories]: {
    screen: Categories,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.CateList]: {
    screen: CateList,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Coupon]: {
    screen: Coupon,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.CouponMy]: {
    screen: CouponMy,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.QrCodeScanner]: {
    screen: QrCodeScanner,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.Prepaid]: {
    screen: Prepaid,
    navigationOptions: {
      header: null,
    }
  },
  [SCREENS.SearchResultList]: {
    screen: SearchResultList,
    navigationOptions: {
      header: null,
    }
  }
};

const StackNavigatorConfig = {
  // initialRouteName: SCREENS.Index,
  initialRouteName: SCREENS.SearchResult,
  // initialRouteName: SCREENS.Bill,
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
