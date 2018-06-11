import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  cardQueryFetch,
  cardQueryFetchSuccess,
  cardQueryFetchFailure,
} from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  CARD_QUERY,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import { getAuthUserFunid } from '../selectors';

export function* cardQueryFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.user.card.query';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.cardQuery, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
      }
    ]);

    if (response.code !== 10000) {
      yield put(cardQueryFetchFailure());
      yield put(addError(response.msg));
      return false;
    }
    console.log(response);
    console.log(JSON.stringify(response));

    yield put(cardQueryFetchSuccess(response.result));
  } catch (err) {
    console.log(err);
    yield put(cardQueryFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* cardQueryFetchWatch() {
  yield takeEvery(CARD_QUERY.REQUEST, cardQueryFetchWatchHandle);
}
