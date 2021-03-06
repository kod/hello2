import { StackNavigator } from 'react-navigation';
import { SCREENS } from '../common/constants';
import Address from '../screens/Address';
import AddressAdd from '../screens/AddressAdd';
import AddressModify from '../screens/AddressModify';
import AppTabNavigator from './AppTabNavigator';
import Bill from '../screens/Bill';
import BillDetail from '../screens/BillDetail';
import Categories from '../screens/Categories';
import CertifiedInformation from '../screens/CertifiedInformation';
import CertifiedInformationSchool from '../screens/CertifiedInformationSchool';
import CertifiedInformationContact from '../screens/CertifiedInformationContact';
import ForgotPasswordOne from '../screens/ForgotPasswordOne';
import ForgotPasswordTwo from '../screens/ForgotPasswordTwo';
import Invite from '../screens/Invite';
import Language from '../screens/Language';
import Login from '../screens/Login';
import MyCollection from '../screens/MyCollection';
import Order from '../screens/Order';
import OrderWrite from '../screens/OrderWrite';
import Pay from '../screens/Pay';
import PeriodSelect from '../screens/PeriodSelect';
import ProductDetail from '../screens/ProductDetail';
import GroupBuyList from '../screens/GroupBuyList';
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
// import Test from '../screens/Test';
import TransactionPasswordStepOne from '../screens/TransactionPasswordStepOne';
import TransactionPasswordStepTwo from '../screens/TransactionPasswordStepTwo';
import ProductDetailImages from '../screens/ProductDetailImages';
import WebView from '../screens/WebView';
import Evalution from '../screens/Evalution';
import CateList from '../screens/CateList';
import Coupon from '../screens/Coupon';
import CouponMy from '../screens/CouponMy';
import BillMy from '../screens/BillMy';
import QrCodeScanner from '../screens/QrCodeScanner';
import Prepaid from '../screens/Prepaid';
import Cart from '../screens/Cart';
import AboutAs from '../screens/AboutAs';
import CouponSelect from '../screens/CouponSelect';
import Computer from '../screens/Computer';
import Mobile from '../screens/Mobile';
import SmartDigital from '../screens/SmartDigital';
import OrderDetail from '../screens/OrderDetail';
import StagingDetails from '../screens/StagingDetails';
import PaymentCode from '../screens/PaymentCode';
import CombinationPayment from '../screens/CombinationPayment';
import StudentCardUpload from '../screens/StudentCardUpload';
import IdCardUpload from '../screens/IdCardUpload';
import HandHeldPhotoUpload from '../screens/HandHeldPhotoUpload';
import BillDetailOld from '../screens/BillDetailOld';

const RouteConfigs = {
  [SCREENS.Index]: {
    screen: AppTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.StudentCardUpload]: {
    screen: StudentCardUpload,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.ProductDetail]: {
    screen: ProductDetail,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.PaymentCode]: {
    screen: PaymentCode,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CombinationPayment]: {
    screen: CombinationPayment,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.OrderDetail]: {
    screen: OrderDetail,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.StagingDetails]: {
    screen: StagingDetails,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Computer]: {
    screen: Computer,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Mobile]: {
    screen: Mobile,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.SmartDigital]: {
    screen: SmartDigital,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Pay]: {
    screen: Pay,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.OrderWrite]: {
    screen: OrderWrite,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Login]: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.RegisterStepOne]: {
    screen: RegisterStepOne,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.RegisterStepTwo]: {
    screen: RegisterStepTwo,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.SearchResult]: {
    screen: SearchResult,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.MyCollection]: {
    screen: MyCollection,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Settings]: {
    screen: Settings,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Language]: {
    screen: Language,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.RegisterFastStepOne]: {
    screen: RegisterFastStepOne,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.RegisterFastStepTwo]: {
    screen: RegisterFastStepTwo,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.ForgotPasswordOne]: {
    screen: ForgotPasswordOne,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.ForgotPasswordTwo]: {
    screen: ForgotPasswordTwo,
    navigationOptions: {
      header: null,
    },
  },
  // [SCREENS.Test]: {
  //   screen: Test,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  [SCREENS.Address]: {
    screen: Address,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.AddressAdd]: {
    screen: AddressAdd,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.AddressModify]: {
    screen: AddressModify,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CertifiedInformation]: {
    screen: CertifiedInformation,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CertifiedInformationSchool]: {
    screen: CertifiedInformationSchool,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CertifiedInformationContact]: {
    screen: CertifiedInformationContact,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.SchoolSelect]: {
    screen: SchoolSelect,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.TransactionPasswordStepOne]: {
    screen: TransactionPasswordStepOne,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.TransactionPasswordStepTwo]: {
    screen: TransactionPasswordStepTwo,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.ProductDetailImages]: {
    screen: ProductDetailImages,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.WebView]: {
    screen: WebView,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Bill]: {
    screen: Bill,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.BillDetail]: {
    screen: BillDetail,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.RepaymentRecord]: {
    screen: RepaymentRecord,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Order]: {
    screen: Order,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.PeriodSelect]: {
    screen: PeriodSelect,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.SecurityCenter]: {
    screen: SecurityCenter,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Evalution]: {
    screen: Evalution,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Categories]: {
    screen: Categories,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CateList]: {
    screen: CateList,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Coupon]: {
    screen: Coupon,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CouponMy]: {
    screen: CouponMy,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.BillMy]: {
    screen: BillMy,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.QrCodeScanner]: {
    screen: QrCodeScanner,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Prepaid]: {
    screen: Prepaid,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.SearchResultList]: {
    screen: SearchResultList,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Invite]: {
    screen: Invite,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.Cart]: {
    screen: Cart,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.GroupBuyList]: {
    screen: GroupBuyList,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.AboutAs]: {
    screen: AboutAs,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.CouponSelect]: {
    screen: CouponSelect,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.IdCardUpload]: {
    screen: IdCardUpload,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.HandHeldPhotoUpload]: {
    screen: HandHeldPhotoUpload,
    navigationOptions: {
      header: null,
    },
  },
  [SCREENS.BillDetailOld]: {
    screen: BillDetailOld,
    navigationOptions: {
      header: null,
    },
  },
};

const StackNavigatorConfig = {
  initialRouteName: SCREENS.Index,
  // initialRouteName: SCREENS.AddressAdd,
  // initialRouteName: SCREENS.Login,
  headerMode: 'screen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#3e9ce9',
    },
    headerTitleStyle: {
      color: '#fff',
      fontSize: 20,
    },
    headerTintColor: '#fff',
  },
};

const AppNavigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default AppNavigator;
