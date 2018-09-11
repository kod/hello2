import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  // cardSubmitFetch,
  cardSubmitFetchSuccess,
  cardSubmitFetchFailure,
} from '../actions/cardSubmit';
import {
  cardQueryFetch,
  // cardQueryFetch,
} from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  CARD_SUBMIT,
  // CARD_SUBMIT,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

export function* cardSubmitFetchWatchHandle(action) {
  try {
    const {
      name,
      // name,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.user.card.submit';
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
          key: 'name',
          value: name,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.cardSubmit, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        name,
        msisdn,
      },
    ]);

    if (response.code !== 10000) {
      yield put(cardSubmitFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(cardSubmitFetchSuccess());
    }
  } catch (err) {
    yield put(cardSubmitFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* cardSubmitFetchWatch() {
  yield takeEvery(CARD_SUBMIT.REQUEST, cardSubmitFetchWatchHandle);
}

export function* cardSubmitSuccessWatchHandle() {
  try {
    yield put(cardQueryFetch());
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cardSubmitSuccessWatch() {
  yield takeEvery(CARD_SUBMIT.SUCCESS, cardSubmitSuccessWatchHandle);
}
