import { Dimensions, Platform, StatusBar } from 'react-native';

export const SCREENS = {
  Address: 'Address',
  AddressAdd: 'AddressAdd',
  AddressEdit: 'AddressEdit',
  Bill: 'Bill',
  BillDetail: 'BillDetail',
  BillingPeriodDetail: 'BillingPeriodDetail',
  Card: 'Card',
  Cart: 'Cart',
  Categories: 'Categories',
  CateList: 'CateList',
  CertifiedInformation: 'CertifiedInformation',
  CertifiedInformationContact: 'CertifiedInformationContact',
  CertifiedInformationSchool: 'CertifiedInformationSchool',
  Evalution: 'Evalution',
  ForgotPasswordOne: 'ForgotPasswordOne',
  ForgotPasswordTwo: 'ForgotPasswordTwo',
  Index: 'Index',
  Language: 'Language',
  Login: 'Login',
  Main: 'Main',
  Me: 'Me',
  MyCollection: 'MyCollection',
  Order: 'Order',
  OrderWrite: 'OrderWrite',
  Pay: 'Pay',
  PeriodSelect: 'PeriodSelect',
  ProductDetail: 'ProductDetail',
  ProductDetailComment: 'ProductDetailComment',
  ProductDetailImages: 'ProductDetailImages',
  ProductDetailMain: 'ProductDetailMain',
  ProductDetailMainGroupon: 'ProductDetailMainGroupon',
  ProductDetailParam: 'ProductDetailParam',
  Recharge: 'Recharge',
  RegisterFastStepOne: 'RegisterFastStepOne',
  RegisterFastStepTwo: 'RegisterFastStepTwo',
  RegisterStepOne: 'RegisterStepOne',
  RegisterStepTwo: 'RegisterStepTwo',
  RepaymentRecord: 'RepaymentRecord',
  SchoolSelect: 'SchoolSelect',
  SearchResult: 'SearchResult',
  SecurityCenter: 'SecurityCenter',
  Settings: 'Settings',
  Test: 'Test',
  TransactionPasswordStepOne: 'TransactionPasswordStepOne',
  TransactionPasswordStepTwo: 'TransactionPasswordStepTwo',
  WebView: 'WebView',
};

export const CARMAXNUMBER = 50;

export const PHONEEXPR = /^[0-9]{8,11}$/; //手机号
export const PWDEXPR = /^.{8,20}$/; // 密码

export const WINDOW_WIDTH = Math.floor(Dimensions.get('window').width);
export const WINDOW_HEIGHT = Math.floor(Dimensions.get('window').height);
export const SIDEINTERVAL = Math.floor(Dimensions.get('window').width) * 0.04;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
