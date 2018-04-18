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

export const AUTH_SIGNUP = defineAction(
  'AUTH_SIGNUP',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);

export const ERROR = defineAction('ERROR', [ADD, CLEAR], appNamespace);