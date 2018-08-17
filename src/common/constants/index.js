import { Dimensions, Platform, StatusBar } from 'react-native';

export const CARMAXNUMBER = 50;

export const SUPPORT_CENTER_URL = 'https://buyoo.vn/html/paystepM.html';
export const HOW_TO_BUY_URL = 'https://buyoo.vn/html/paystepM.html';
export const BUSINESS_EMAIL = 'business.vn@buyoo.aisa';
export const SERVICE_EMAIL = 'service.vn@buyoo.aisa';
export const SERVICE_PHONE = '1900555506';
export const BUYOO = 'Buyoo';
export const BUYOO_VN = `${BUYOO}.vn`;

export const PHONE_EXPR = /^0?9[0-9]{8}|0?1[0-9]{9}$/; // 手机号
export const EMAIL_EXPR = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/; // 邮箱
export const NAME_EXPR = /^.*\s.*$/; // 越南姓名
export const IDENTIFICATION_EXPR = /^(\d{9}|\d{12})$/; // 越南身份证
export const CARD_PASSWORD_EXPR = /^\d{6}$/; // 卡密码
export const LOGIN_PASSWORD_EXPR = /^[\w~!@#$%^&*()_+`\-=[\]{}\\|;:,./<>?]{8,20}$/; // 登录密码
export const HTML_REGEX = /html\/(\w+).html/;
export const BRANDID_REGEX = /brandId=(\d+)/;
export const CLASSIFYID_REGEX = /classifyId=(\d+)/;
export const SUBCLASSFYID_REGEX = /subClassfyId=(\d+)/;
export const THIRDCLASSFYID_REGEX = /thirdClassfyId=(\d+)/;

export const WINDOW_WIDTH = Math.floor(Dimensions.get('window').width);
export const WINDOW_HEIGHT = Math.floor(Dimensions.get('window').height);
export const SIDEINTERVAL = Math.floor(Dimensions.get('window').width) * 0.04;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const COUPONMY_TABNAVIGATOR_MAP = {
  CouponMyUnused: 1,
  CouponMyUsed: 2,
  CouponMyPast: 0,
  1: 'CouponMyUnused',
  2: 'CouponMyUsed',
  0: 'CouponMyPast',
};

export const PROVIDER_TYPE_MAP = {
  recharge: 32,
  phoneCard: 33,
  scratchCards: 34,
  32: 'recharge',
  33: 'phoneCard',
  34: 'scratchCards',
};

export const MODAL_TYPES = {
  ADDRESSADD: 'ADDRESSADD',
  PARAMSSELECT: 'PARAMSSELECT',
  LOADER: 'LOADER',
};

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
  WebView: 'WebView',
};
