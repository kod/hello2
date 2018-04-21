import { delay } from 'redux-saga';
import {
  take,
  call,
  apply,
  put,
  race,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';

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

import { addError } from '../actions/error';

import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  AUTH_REFRESH_ACCESS_TOKEN,
} from '../constants/actionTypes';

import { REHYDRATE } from 'redux-persist/constants';
import { getLang } from '../selectors';
import { setLanguage } from "../actions/i18n";

export function* authorize(email, password, isProvisionalAccount) {
  // use apply instead of call to pass this to function
  const loginResponse = yield apply(buyoo, buyoo.login, [
    {
      email,
      password,
    }
  ]);
  // const options = setProvisionalAccountOptions(isProvisionalAccount, password);
  // yield put(loginSuccess(loginResponse, options));
  return loginResponse;
}

export function* watchLoginRequestTask() {
  while (true) {
    try {
      const action = yield take(AUTH_LOGIN.REQUEST);
      const { email, password, isProvisionalAccount } = action.payload;
      const authResponse = yield call(
        authorize,
        email,
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
      const errMessage =
        err.errors && err.errors.system && err.errors.system.message
          ? err.errors.system.message
          : '';
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
      // console.log('err in watchRehydrate ', err);
    } finally {
      yield put(rehydrateSuccess());
    }
  }
}
