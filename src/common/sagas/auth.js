import {
  take,
  put,
  select,
} from 'redux-saga/effects';
import {
  rehydrateSuccess,
} from '../actions/auth';

import { REHYDRATE } from 'redux-persist/constants';
import { getLang } from '../selectors';
import { setLanguage } from "../actions/i18n";

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
