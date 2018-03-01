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
import pixiv from '../helpers/apiClient';
import { getAuth, getAuthUser, getLang } from '../selectors';
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  AUTH_REFRESH_ACCESS_TOKEN,
} from '../constants/actionTypes';

const setProvisionalAccountOptions = (isProvisionalAccount, password) => ({
  isProvisionalAccount,
  password: isProvisionalAccount ? password : null,
});

export function* authorize(email, password, isProvisionalAccount) {
  // use apply instead of call to pass this to function
  const loginResponse = yield apply(pixiv, pixiv.login, [
    email,
    password,
    false,
  ]);
  const options = setProvisionalAccountOptions(isProvisionalAccount, password);
  yield put(loginSuccess(loginResponse, options));
  return loginResponse;
}

export function* handleRefreshAccessToken(refreshToken) {
  try {
    const response = yield apply(pixiv, pixiv.refreshAccessToken, [
      refreshToken,
    ]);
    const user = yield select(getAuthUser);
    const options = setProvisionalAccountOptions(
      user.isProvisionalAccount,
      user.password,
    );

    yield put(refreshAccessTokenSuccess(response, options));
    return response;
  } catch (err) {
    yield put(refreshAccessTokenFailure());
    yield put(logout());
  }
  return null;
}

export function* scheduleRefreshAccessToken(refreshToken, delayMilisecond) {
  yield call(delay, delayMilisecond);
  const response = yield call(handleRefreshAccessToken, refreshToken);
  return response;
}

export function* handleLogout() {
  yield apply(pixiv, pixiv.logout);
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
        call(refreshAccessTokenOnExpiry, authResponse),
      ]);
      yield call(handleLogout);
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

export function* watchRefreshAccessTokenRequestTask() {
  while (true) {
    try {
      const action = yield take(AUTH_REFRESH_ACCESS_TOKEN.REQUEST);
      const { refreshToken } = action.payload;
      const authResponse = yield call(handleRefreshAccessToken, refreshToken);
      yield race([
        take(AUTH_LOGOUT.SUCCESS),
        call(refreshAccessTokenOnExpiry, authResponse),
      ]);
      yield call(handleLogout);
      // user logged out, next while iteration will wait for the
      // next AUTH_REFRESH_ACCESS_TOKEN.REQUEST action
    } catch (err) {
      const errMessage =
        err.errors && err.errors.system && err.errors.system.message
          ? err.errors.system.message
          : '';
      yield put(refreshAccessTokenFailure());
      yield put(addError(errMessage));
    }
  }
}

export function* signUp(nickname) {
  const signUpResponse = yield apply(pixiv, pixiv.createProvisionalAccount, [
    nickname,
  ]);
  yield put(signUpSuccess(signUpResponse));
  return signUpResponse;
}
