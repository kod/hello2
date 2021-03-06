import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  updatePeriodFetchSuccess,
  updatePeriodFetchFailure,
} from '../actions/updatePeriod';
import { cardQueryFetch } from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { UPDATE_PERIOD } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* updatePeriodFetchWatchHandle(action) {
  try {
    const { period } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.account.period';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'period',
          value: period,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.updatePeriod, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        period,
      },
    ]);

    if (response.code !== 10000) {
      yield put(updatePeriodFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(updatePeriodFetchSuccess());
    }
  } catch (err) {
    yield put(updatePeriodFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* updatePeriodFetchWatch() {
  yield takeEvery(UPDATE_PERIOD.REQUEST, updatePeriodFetchWatchHandle);
}

export function* updatePeriodSuccessWatchHandle() {
  try {
    yield put(cardQueryFetch());
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* updatePeriodSuccessWatch() {
  yield takeEvery(UPDATE_PERIOD.SUCCESS, updatePeriodSuccessWatchHandle);
}
