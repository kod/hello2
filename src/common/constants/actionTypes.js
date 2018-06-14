import { defineAction } from 'redux-define';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  CLEAR,
  CLEAR_ALL,
  ADD,
  ADD_SUCCESS,
  ADD_FAILURE,
  REMOVE,
  REPLACE,
  OPEN,
  CLOSE,
  STOP,
} from './stateConstants';

const appNamespace = defineAction('BUYOO');

export const AUTH_LOGIN = defineAction(
  'AUTH_LOGIN',
  [REQUEST, SUCCESS, FAILURE, STOP],
  appNamespace,
);

export const AUTH_SIGNUP = defineAction(
  'AUTH_SIGNUP',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const AUTH_LOGOUT = defineAction('AUTH_LOGOUT', [SUCCESS], appNamespace);

export const AUTH_REFRESH_ACCESS_TOKEN = defineAction(
  'AUTH_REFRESH_ACCESS_TOKEN',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const AUTH_REHYDRATE = defineAction(
  'AUTH_REHYDRATE',
  [SUCCESS],
  appNamespace,
);

export const AD_DIGITAL = defineAction(
  'AD_DIGITAL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const ADVERST_INFO = defineAction(
  'ADVERST_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const AD_PHONE = defineAction(
  'AD_PHONE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const NEW_COMPUTER = defineAction(
  'NEW_COMPUTER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const TOP_COMPUTER = defineAction(
  'TOP_COMPUTER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETINFO = defineAction(
  'MERGE_GETINFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETDETAIL = defineAction(
  'MERGE_GETDETAIL',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETSLAVE = defineAction(
  'MERGE_GETSLAVE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_CHECK = defineAction(
  'MERGE_CHECK',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const MERGE_GETMASTER = defineAction(
  'MERGE_GETMASTER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const PROMOTION_INFO = defineAction(
  'PROMOTION_INFO',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BANNER_SWIPER = defineAction(
  'BANNER_SWIPER',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BANNER_HOME_RECOMMEND = defineAction(
  'BANNER_HOME_RECOMMEND',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const BANNER_HOME_TYPE = defineAction(
  'BANNER_HOME_TYPE',
  [REQUEST, SUCCESS, FAILURE, CLEAR],
  appNamespace,
);

export const NEWESTINFO = defineAction(
  'NEWESTINFO',
  [REQUEST, SUCCESS, FAILURE, STOP],
  appNamespace,
);

export const USER_CERTIFICATE_INFO = defineAction(
  'USER_CERTIFICATE_INFO',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const CERTIFIED_INFORMATION = defineAction(
  'CERTIFIED_INFORMATION',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const CERTIFIED_INFORMATION_EDIT = defineAction(
  'CERTIFIED_INFORMATION_EDIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART = defineAction(
  'CART',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const CART_ADD = defineAction(
  'CART_ADD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const OTP = defineAction(
  'OTP',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const MODIFYPAYPASSWORD = defineAction(
  'MODIFYPAYPASSWORD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const REGISTER = defineAction(
  'REGISTER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const GET_USERINFO_BYID = defineAction(
  'GET_USERINFO_BYID',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_NUMBER = defineAction(
  'CART_NUMBER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SELECT = defineAction(
  'CART_SELECT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SELECTDELALL = defineAction(
  'CART_SELECTDELALL',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SELECTALL = defineAction(
  'CART_SELECTALL',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_EDIT = defineAction(
  'CART_EDIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_EDITINIT = defineAction(
  'CART_EDITINIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_SUBMIT = defineAction(
  'CART_SUBMIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CART_DELETE = defineAction(
  'CART_DELETE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const PRODUCT_DETAIL = defineAction(
  'PRODUCT_DETAIL',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const PRODUCT_DETAIL_OPACITY = defineAction(
  'PRODUCT_DETAIL_OPACITY',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_INFO = defineAction(
  'PRODUCT_DETAIL_INFO',
  [REQUEST, SUCCESS, FAILURE, STOP, CLEAR],
  appNamespace,
);

export const PRODUCT_DETAIL_NUMBER = defineAction(
  'PRODUCT_DETAIL_NUMBER',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_COLORID = defineAction(
  'PRODUCT_DETAIL_COLORID',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_VERSIONID = defineAction(
  'PRODUCT_DETAIL_VERSIONID',
  [REQUEST],
  appNamespace,
);

export const PRODUCT_DETAIL_SELECT = defineAction(
  'PRODUCT_DETAIL_SELECT',
  [REQUEST],
  appNamespace,
);

export const COMMENT = defineAction(
  'COMMENT',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const ADDRESS = defineAction(
  'ADDRESS',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const ADDRESS_SELECT = defineAction(
  'ADDRESS_SELECT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ORDER_CREATE = defineAction(
  'ORDER_CREATE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const QUERY_ORDER_LIST = defineAction(
  'QUERY_ORDER_LIST',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ORDER_PAY = defineAction(
  'ORDER_PAY',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CARD_SUBMIT = defineAction(
  'CARD_SUBMIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CARD_QUERY = defineAction(
  'CARD_QUERY',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const QUERY_ORDER = defineAction(
  'QUERY_ORDER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CREATE_DISORDER = defineAction(
  'CREATE_DISORDER',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const RETURN_MONEY = defineAction(
  'RETURN_MONEY',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADDRESS_ADD = defineAction(
  'ADDRESS_ADD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADDRESS_EDIT = defineAction(
  'ADDRESS_EDIT',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADDRESS_REMOVE = defineAction(
  'ADDRESS_REMOVE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADDRESS_MODIFY = defineAction(
  'ADDRESS_MODIFY',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const CITY_INFOS = defineAction(
  'CITY_INFOS',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const SCHOOL_INFOS = defineAction(
  'SCHOOL_INFOS',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const COLLECTION = defineAction(
  'COLLECTION',
  [REQUEST, SUCCESS, FAILURE, CLEAR, ADD, REMOVE],
  appNamespace,
);

export const COLLECTION_ADD = defineAction(
  'COLLECTION_ADD',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const COLLECTION_REMOVE = defineAction(
  'COLLECTION_REMOVE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ADD_DETAIL_INFO = defineAction(
  'ADD_DETAIL_INFO',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ERROR = defineAction('ERROR', [ADD, CLEAR], appNamespace);