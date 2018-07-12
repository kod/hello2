import { Dimensions, Platform, StatusBar } from 'react-native';

export const SCREENS = {
  Address: 'Address',
  AddressAdd: 'AddressAdd',
  AddressEdit: 'AddressEdit',
  AboutAs: 'AboutAs',
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
  Coupon: 'Coupon',
  CouponMy: 'CouponMy',
  CouponMyUsed: 'CouponMyUsed',
  CouponMyUnused: 'CouponMyUnused',
  CouponMyPast: 'CouponMyPast',
  CouponSelect: 'CouponSelect',
  Evalution: 'Evalution',
  ForgotPasswordOne: 'ForgotPasswordOne',
  ForgotPasswordTwo: 'ForgotPasswordTwo',
  Index: 'Index',
  Invite: 'Invite',
  Language: 'Language',
  Login: 'Login',
  Main: 'Main',
  Me: 'Me',
  MyCollection: 'MyCollection',
  Order: 'Order',
  OrderWrite: 'OrderWrite',
  Pay: 'Pay',
  PeriodSelect: 'PeriodSelect',
  Prepaid: 'Prepaid',
  PrepaidPhoneCard: 'PrepaidPhoneCard',
  PrepaidRecharge: 'PrepaidRecharge',
  PrepaidScratchCards: 'PrepaidScratchCards',
  ProductDetail: 'ProductDetail',
  ProductDetailComment: 'ProductDetailComment',
  ProductDetailImages: 'ProductDetailImages',
  ProductDetailMain: 'ProductDetailMain',
  ProductDetailMainGroupon: 'ProductDetailMainGroupon',
  ProductDetailParam: 'ProductDetailParam',
  GroupBuyList: 'GroupBuyList',
  QrCodeScanner: 'QrCodeScanner',
  Recharge: 'Recharge',
  RegisterFastStepOne: 'RegisterFastStepOne',
  RegisterFastStepTwo: 'RegisterFastStepTwo',
  RegisterStepOne: 'RegisterStepOne',
  RegisterStepTwo: 'RegisterStepTwo',
  RepaymentRecord: 'RepaymentRecord',
  SchoolSelect: 'SchoolSelect',
  SearchResult: 'SearchResult',
  SearchResultList: 'SearchResultList',
  SecurityCenter: 'SecurityCenter',
  Settings: 'Settings',
  Test: 'Test',
  TransactionPasswordStepOne: 'TransactionPasswordStepOne',
  TransactionPasswordStepTwo: 'TransactionPasswordStepTwo',
  WebView: 'WebView'
};

export const CARMAXNUMBER = 50;

export const PHONEEXPR = /^[0-9]{8,11}$/; //手机号
export const PWDEXPR = /^.{8,20}$/; // 密码

export const WINDOW_WIDTH = Math.floor(Dimensions.get('window').width);
export const WINDOW_HEIGHT = Math.floor(Dimensions.get('window').height);
export const SIDEINTERVAL = Math.floor(Dimensions.get('window').width) * 0.04;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const COUPONMY_TABNAVIGATOR_MAP = {
  CouponMyUnused: 1,
  CouponMyUsed: 2,
  CouponMyPast: 0,
  1: 'CouponMyUnused',
  2: 'CouponMyUsed',
  0: 'CouponMyPast'
};

export const PROVIDER_TYPE_MAP = {
  recharge: 32,
  phoneCard: 33,
  scratchCards: 34,
  32: 'recharge',
  33: 'phoneCard',
  34: 'scratchCards',
};
