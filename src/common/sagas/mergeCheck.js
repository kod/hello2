import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { mergeCheckFetchSuccess, mergeCheckFetchFailure } from '../actions/mergeCheck';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_CHECK } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import { getAuthUserFunid, } from '../selectors';

export function* mergeCheckFetchWatchHandle(action) {
  try {
    const {
      brandId = 0,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);
    
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.merge.check';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'brandid',
          value: brandId
        },
        {
          key: 'funid',
          value: funid
        },
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.mergeCheck, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        brandid: brandId,
        funid: funid,
      }
    ]);

    if (response.code !== 10000) {
      yield put(mergeCheckFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(mergeCheckFetchSuccess(response.details));
  } catch (err) {
    yield put(mergeCheckFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeCheckFetchWatch() {
  yield takeEvery(MERGE_CHECK.REQUEST, mergeCheckFetchWatchHandle);
}
