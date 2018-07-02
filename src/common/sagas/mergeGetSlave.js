import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { mergeGetSlaveFetchSuccess, mergeGetSlaveFetchFailure } from '../actions/mergeGetSlave';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETSLAVE } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";


export function* mergeGetSlaveFetchWatchHandle(action) {
  try {
    const {
      brandId = 0,
      masterId = 0,
      pagesize = 10,
      currentpage = 1,
    } = action.payload;
    
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.merge.slave';
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
          key: 'mergemasterid',
          value: masterId
        },
        {
          key: 'pagesize',
          value: pagesize
        },
        {
          key: 'currentpage',
          value: currentpage
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.mergeGetSlave, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        brandid: brandId,
        mergemasterid: masterId,
        pagesize: pagesize,
        currentpage: currentpage
      }
    ]);

    if (response.code !== 10000) {
      yield put(mergeGetSlaveFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(mergeGetSlaveFetchSuccess(response));
  } catch (err) {
    yield put(mergeGetSlaveFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetSlaveFetchWatch() {
  yield takeEvery(MERGE_GETSLAVE.REQUEST, mergeGetSlaveFetchWatchHandle);
}
