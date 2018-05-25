import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { mergeCheckFetchSuccess, mergeCheckFetchFailure } from '../actions/mergeCheck';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_CHECK } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import { getAuthUserFunid, } from '../selectors';

export function* mergeCheckFetchWatchHandle(action) {
  try {
    const {
      brandId = 0,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);
    console.log(action.payload);
    
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.merge.check';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
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

    console.log('MMMMMM');
    console.log(JSON.stringify(response));
    

    if (response.code !== 10000) {
      yield put(mergeCheckFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(mergeCheckFetchSuccess(response.details));
  } catch (err) {
    yield put(mergeCheckFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* mergeCheckFetchWatch() {
  yield takeEvery(MERGE_CHECK.REQUEST, mergeCheckFetchWatchHandle);
}
