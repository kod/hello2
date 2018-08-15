import { Platform, DeviceEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { takeEvery, apply, put } from 'redux-saga/effects';

import {
  // loginFetch,
  loginFetchSuccess,
  loginFetchFailure,
} from '../actions/login';
import { addError } from '../actions/error';
import {
  cartRequest,
  cartClear,
  // cartClear,
} from '../actions/cart';
import {
  userCertificateInfoFetch,
  userCertificateInfoClear,
} from '../actions/userCertificateInfo';
import {
  cardQueryFetch,
  cardQueryClear,
  // cardQueryClear,
} from '../actions/cardQuery';
import { queryOrderListClear } from '../actions/queryOrderList';

import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';

import { SCREENS } from '../constants';
import { LOGIN, LOGOUT } from '../constants/actionTypes';
import { encryptMD5 } from '../../components/AuthEncrypt';

export function* loginFetchWatchHandle(action) {
  const { msisdn, password } = action.payload;
  try {
    const Key = 'userKey';
    const provider = Platform.OS === 'ios' ? '1' : '2';
    const otp = '';
    const appid = DeviceInfo.getDeviceId() || '';

    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'password',
          value: password,
        },
        {
          key: 'otp',
          value: otp,
        },
        {
          key: 'appid',
          value: appid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.login, [
      {
        provider,
        msisdn,
        password,
        otp,
        appid,
        encryption: encrypt,
      },
    ]);
    console.log(JSON.stringify(response));
    console.log(response);

    if (response.status !== 10000) {
      yield put(loginFetchFailure());
      switch (response.status) {
        case 60050:
          yield put(addError(i18n.userNotExist));
          break;

        case 60051:
          yield put(addError(i18n.wrongPhoneNumberOrPassword));
          break;

        default:
          yield put(addError(response.result));
          break;
      }
    } else {
      yield put(loginFetchSuccess(response));
    }
  } catch (err) {
    yield put(loginFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* loginSuccessWatchHandle() {
  // const { screen } = action.payload;
  try {
    yield put(userCertificateInfoFetch());

    yield put(cartRequest());
    yield put(cardQueryFetch());

    yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [SCREENS.Login]);
  } catch (err) {
    console.warn(err);
  }
}

export function* logoutSuccessWatchHandle() {
  // const { screen } = action.payload;
  try {
    yield put(cartClear());
    yield put(cardQueryClear());
    yield put(queryOrderListClear());
    yield put(userCertificateInfoClear());
  } catch (err) {
    console.warn(err);
  }
}

export function* loginFetchWatch() {
  yield takeEvery(LOGIN.REQUEST, loginFetchWatchHandle);
}

export function* loginSuccessWatch() {
  yield takeEvery(LOGIN.SUCCESS, loginSuccessWatchHandle);
}

export function* logoutSuccessWatch() {
  yield takeEvery(LOGOUT.SUCCESS, logoutSuccessWatchHandle);
}
