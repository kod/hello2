import { REHYDRATE } from 'redux-persist';
import {
  take,
  put,
  // race,
  select,
  // fork,
  // cancel,
  // takeEvery,
} from 'redux-saga/effects';
import {
  // login,
  // loginSuccess,
  // loginFailure,
  // signUpSuccess,
  // signUpFailure,
  // logout,
  // refreshAccessToken,
  // refreshAccessTokenSuccess,
  // refreshAccessTokenFailure,
  rehydrateSuccess,
} from '../actions/auth';
import { setLanguage } from '../actions/i18n';
import {
  getLang,
  // getAuthUser,
  // getAuth,
  // getAuthUserFunid,
} from '../selectors';

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

export function* logoutWatchHandle() {
  // yield put(cartClear());
  // yield put(cardQueryClear());
  // yield put(queryOrderListClear());
  // yield put(userCertificateInfoClear());
}

export function* logoutWatch() {
  // yield takeEvery(AUTH_LOGOUT.SUCCESS, logoutWatchHandle);
}
