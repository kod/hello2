import { Platform, DeviceEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist/constants';
import {
  take,
  call,
  apply,
  put,
  race,
  select,
  fork,
  cancel,
  takeEvery,
} from 'redux-saga/effects';
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  AUTH_REFRESH_ACCESS_TOKEN,
} from '../constants/actionTypes';

import {
  login,
  loginSuccess,
  loginFailure,
  signUpSuccess,
  signUpFailure,
  logout,
  refreshAccessToken,
  refreshAccessTokenSuccess,
  refreshAccessTokenFailure,
  rehydrateSuccess,
} from '../actions/auth';
import {
  cardQueryFetch, 
  cardQueryClear, 
} from "../actions/cardQuery";
import {
  cartRequest,
  cartClear,
} from "../actions/cart";
import { addError } from '../actions/error';
import { setLanguage } from "../actions/i18n";
import { userCertificateInfoFetch, userCertificateInfoClear } from "../actions/userCertificateInfo";

import { getLang, getAuthUser, getAuth, getAuthUserFunid } from '../selectors';
import buyoo from '../helpers/apiClient';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';

export function* authorize(phone, passwordParam, isProvisionalAccount) {
  const Key = 'userKey';

  const provider = Platform.OS === 'ios' ? '1' : '2';
  const msisdn = phone || '';
  const password = passwordParam || '';
  const otp = '';
  const appid = DeviceInfo.getDeviceId() || '';

  const encrypt = encrypt_MD5(
    [
      {
        key: 'provider',
        value: provider
      },
      {
        key: 'msisdn',
        value: msisdn
      },
      {
        key: 'password',
        value: password
      },
      {
        key: 'otp',
        value: otp
      },
      {
        key: 'appid',
        value: appid
      }
    ],
    Key
  );

  // use apply instead of call to pass this to function
  const loginResponse = yield apply(buyoo, buyoo.login, [
    {
      provider: provider,
      msisdn: msisdn,
      password: password,
      otp: otp,
      appid: appid,
      encryption: encrypt
      }
  ]);
  // const options = setProvisionalAccountOptions(isProvisionalAccount, password);
  // if (loginResponse.status !== 10000) throw res.data.result;
  yield put(loginSuccess(loginResponse));
  // yield put(loginSuccess(loginResponse, options));
  return loginResponse;
}

export function* watchLoginRequestTask() {
  while (true) {
    try {
      const action = yield take(AUTH_LOGIN.REQUEST);
      const { phone, password, isProvisionalAccount } = action.payload;
      const authResponse = yield call(
        authorize,
        phone,
        password,
        isProvisionalAccount,
      );
      yield race([
        take(AUTH_LOGOUT.SUCCESS),
        // call(refreshAccessTokenOnExpiry, authResponse),
      ]);
      // yield call(handleLogout);
      // user logged out, next while iteration will wait for the
      // next AUTH_LOGIN.REQUEST action
    } catch (err) {
      const errMessage = err.error ? err.error : err.toString().slice(7);
      yield put(loginFailure());
      yield put(addError(errMessage));
    }
  }
}

export function* watchLoginRequest() {
  while (true) {
    const loginRequestTask = yield fork(watchLoginRequestTask);
    yield take(AUTH_LOGIN.STOP);
    yield cancel(loginRequestTask);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    try {
      yield take(AUTH_LOGIN.SUCCESS);

      yield put(userCertificateInfoFetch());

      yield put(cartRequest());
      yield put(cardQueryFetch());

      yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [ 'closeLoginScreen' ]);
    } catch (err) {
      // todo logout user
    }
  }
}

export function* watchRehydrate() {
  while (true) {
    try {
      yield take(REHYDRATE);
      // const user = yield select(getAuthUser);
      // if (user) {
      //   yield put(refreshAccessToken(user.refreshToken));
      //   yield take([
      //     AUTH_REFRESH_ACCESS_TOKEN.SUCCESS,
      //     AUTH_REFRESH_ACCESS_TOKEN.FAILURE,
      //     AUTH_LOGOUT.SUCCESS,
      //   ]);
      // }
      const lang = yield select(getLang);
      yield put(setLanguage(lang));
    } catch (err) {
      // todo logout user
    } finally {
      yield put(rehydrateSuccess());
    }
  }
}

export function* logoutWatchHandle(action) {
  yield put(cartClear());
  yield put(cardQueryClear());
  yield put(userCertificateInfoClear());
}

export function* logoutWatch() {
  yield takeEvery(AUTH_LOGOUT.SUCCESS, logoutWatchHandle);
}