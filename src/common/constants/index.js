import { Dimensions, Platform, StatusBar } from 'react-native';

export const DEBUG = false;
export const IS_I18N = DEBUG; // 是否支持多语言; 默认为越南语
export const CARMAXNUMBER = 50;
export const MINIMUM_PAYMENT_AMOUNT = 10000; // 最小支付金额
export const OSS_IMAGE_QUALITY = 70; // 图片压缩比例；1-100；100：不压缩；
export const LINE_HEIGHT_RATIO = 1.618; // 行高
export const IS_PROMPT_FIRSTPAY = true; // 没有选择首付时是否提示选择首付
export const MIN_FIRSTPAY_RATE = 0.1; // 最低首付比: 0, 0.1, 0.2, 0.3, 0.4, 0.5

export const DOMAIN = 'https://buyoo.vn';
export const SHARE_URL = `${DOMAIN}/html/downloadApp.html?userID=XXX`;
export const SUPPORT_CENTER_URL = `${DOMAIN}/html/buyIntroM.html`;
export const HOW_TO_BUY_URL = `${DOMAIN}/html/paystepM.html`;
export const BUSINESS_EMAIL = 'business.vn@buyoo.aisa';
export const SERVICE_EMAIL = 'service.vn@buyoo.aisa';
export const SERVICE_PHONE = '1900555506';
export const BUYOO = 'Buyoo';
export const BUYOO_VN = `${BUYOO}.vn`;
export const ZALO = 'zalo';
export const GOOGLE_PLUS = 'google+';
export const FACEBOOK = 'facebook';
export const MONETARY = '₫'; // 货币单位
export const PAYOO_STORE_MAP = 'https://payoo.vn/map/public/?verify=true#'; // payoo门店地图
export const FUNCARD_HELP_WHAT = `${DOMAIN}/html/aboutFunCard.html#Buyoo-Funcard-la-gi`; // buyoo card 是什么
export const FUNCARD_HELP_APPLY = `${DOMAIN}/html/aboutFunCard.html#Cach-thuc-dang-ki-the-Buyoo-Fun-Card`; // 如何申请
export const FUNCARD_HELP_STAGE = `${DOMAIN}/html/aboutFunCard.html#Huong-dan-mua-hang-bang-Buyoo-Fun-Card`; // 如何分期
export const FUNCARD_HELP_REPAY = `${DOMAIN}/html/aboutFunCard.html#Thanh-toan-no-hang-thang-the-Buyoo-Fun-Card-nhu-the-nao`; // 如何还款

export const STUDENT_CARD_POSITIVE_IMAGE =
  'https://oss.buyoo.vn/usercollect/1/20180917153943_QB7.png'; // 学生证正面

export const STUDENT_CARD_OBVERSE_IMAGE =
  'https://oss.buyoo.vn/usercollect/1/20180917154051_35a.png'; // 学生证反面

export const ID_CARD_POSITIVE_IMAGE =
  'https://oss.buyoo.vn/usercollect/1/20180917154409_o2p.png'; // 身份证正面

export const ID_CARD_OBVERSE_IMAGE =
  'https://oss.buyoo.vn/usercollect/1/20180917154446_5U2.png'; // 身份证反面

export const HANDHELD_STUDENT_ID_CARD_IMAGE =
  'https://oss.buyoo.vn/usercollect/1/20180917152555_R2T.png'; // 手持学生证

export const HANDHELD_IDENTITY_CARD_IMAGE =
  'https://oss.buyoo.vn/usercollect/1/20180917153832_5NH.png'; // 手持身份证

export const CREDIT_PAYWAY = 1;
export const INTERNET_BANK_PAYWAY = 2;
export const OFFLINE_PAYWAY = 5;

export const PHONE_EXPR = /^0?[0-9]{9}|0?[0-9]{10}$/; // 手机号
// export const PHONE_EXPR = /^0?9[0-9]{8}|0?1[0-9]{9}$/; // 手机号
export const EMAIL_EXPR = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/; // 邮箱
export const NAME_EXPR = /^.*\s.*$/; // 越南姓名
export const IDENTIFICATION_EXPR = /^(\d{9}|\d{12})$/; // 越南身份证
export const CARD_PASSWORD_EXPR = /^\d{6}$/; // 交易密码
export const LOGIN_PASSWORD_EXPR = /^[\w~!@#$%^&*()_+`\-=[\]{}\\|;:,./<>?]{8,20}$/; // 登录密码
export const HTML_REGEX = /\/(\w+)\.html/;
export const BRANDID_REGEX = /brandId=(\d+)/;
export const ORDERNO_REGEX = /orderNo=(\d+)/;
export const TRADENO_REGEX = /tradeNo=(\d+)/;
export const CLASSIFYID_REGEX = /classifyId=(\d+)/;
export const SUBCLASSFYID_REGEX = /subClassfyId=(\d+)/;
export const THIRDCLASSFYID_REGEX = /thirdClassfyId=(\d+)/;
export const SHAREID_REGEX = /userID=([A-Z0-9]+)/;
export const PRIVATE_URL_REGEX = /(.*)\?/;
export const INVITATION_CODE_REGEX = /₫ ([A-Z0-9]+) ₫/; // 邀请码

export const WINDOW_WIDTH = Math.floor(Dimensions.get('window').width);
export const WINDOW_HEIGHT = Math.floor(Dimensions.get('window').height);
export const SIDEINTERVAL = Math.floor(Dimensions.get('window').width) * 0.04;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const FIRST_PAYMENT_RATE = [0, 0.1, 0.2, 0.3, 0.4, 0.5]; // 首付比例
export const REPAYMENT_MONTH = [3, 6, 9, 12]; // 分期数

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
  ACTIONSHEET: 'ACTIONSHEET',
  BILLSELECT: 'BILLSELECT',
  ENTERPASSWORD: 'ENTERPASSWORD',
  SHARE: 'SHARE',
  PERMONTHPRICE: 'PERMONTHPRICE',
  STAGINGDETAILS: 'STAGINGDETAILS',
};

export const SCREENS = {
  Computer: 'Computer',
  Mobile: 'Mobile',
  SmartDigital: 'SmartDigital',
  Address: 'Address',
  AddressAdd: 'AddressAdd',
  AddressModify: 'AddressModify',
  AboutAs: 'AboutAs',
  Bill: 'Bill',
  BillDetail: 'BillDetail',
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
  BillMy: 'BillMy',
  BillCurrent: 'BillCurrent',
  BillOut: 'BillOut',
  BillOverdue: 'BillOverdue',
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
  OrderDetail: 'OrderDetail',
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
  StagingDetails: 'StagingDetails',
  PaymentCode: 'PaymentCode',
  CombinationPayment: 'CombinationPayment',
  StudentCardUpload: 'StudentCardUpload',
  IdCardUpload: 'IdCardUpload',
  HandHeldPhotoUpload: 'HandHeldPhotoUpload',
  BillDetailOld: 'BillDetailOld',
};

export const COUPONMY_TABNAVIGATOR_MAP = {
  CouponMyUnused: 1,
  CouponMyUsed: 2,
  CouponMyPast: 0,
  1: 'CouponMyUnused',
  2: 'CouponMyUsed',
  0: 'CouponMyPast',
};

export const BILLMY_TABNAVIGATOR_MAP = {
  [SCREENS.BillCurrent]: 1,
  [SCREENS.BillOut]: 3,
  [SCREENS.BillOverdue]: 5,
  1: SCREENS.BillCurrent,
  3: SCREENS.BillOut,
  5: SCREENS.BillOverdue,
};
