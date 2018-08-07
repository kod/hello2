import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  collectionFetch,
  collectionFetchSuccess,
  collectionFetchFailure,
  collectionAddFetchSuccess,
  collectionAddFetchFailure,
  collectionRemoveFetchSuccess,
  collectionRemoveFetchFailure,
} from '../actions/collection';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  COLLECTION,
  COLLECTION_ADD,
  COLLECTION_REMOVE,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

export function* collectionFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);
    const pagesize = 100;
    const currentpage = 1;

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.getcollection';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '1.0';
  
    let signType = signTypeMD5(appId, method, charset, Key, false);

    let encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'msisdn',
          value: msisdn
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

    let response = yield apply(buyoo, buyoo.userGetCollection, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        msisdn: msisdn,
        pagesize: pagesize,
        currentpage: currentpage
      }
    ]);

    if (response.code !== 10000) {
      yield put(collectionFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    response = {
      ...response,
      details: response.details.map((val, key) => {
        val.imageUrl = val.brandImage;
        val.name = val.brandName;
        val.price = val.brandPrice;
        return val;
      })
    }

    yield put(collectionFetchSuccess(response));
  } catch (err) {
    yield put(collectionFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectionAddFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const brandids = action.payload.brandIds;    

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.addcollection';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';
  
    let signType = signTypeMD5(appId, method, charset, Key, true);

    let encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'brandids',
          value: brandids
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.userBatchCollection, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        brandids: brandids,
      }
    ]);

    if (response.code !== 10000) {
      yield put(collectionAddFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(collectionAddFetchSuccess());
  } catch (err) {
    yield put(collectionAddFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectionAddSuccessWatchHandle() {
  try {
    yield put(collectionFetch());
  } catch (err) {
    
  }
}

export function* collectionRemoveFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);
    const brand_id = action.payload.brand_id;    

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.cancelcollection';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '1.0';
  
    let signType = signTypeMD5(appId, method, charset, Key, false);

    let encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'msisdn',
          value: msisdn
        },
        {
          key: 'brand_id',
          value: brand_id
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.userCancelCollection, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        msisdn: msisdn,
        brand_id: brand_id,
      }
    ]);

    if (response.code !== 10000) {
      yield put(collectionRemoveFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(collectionRemoveFetchSuccess());
  } catch (err) {
    yield put(collectionRemoveFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectionRemoveSuccessWatchHandle() {
  try {
    yield put(collectionFetch());
  } catch (err) {
    
  }
}

export function* collectionFetchWatch() {
  yield takeEvery(COLLECTION.REQUEST, collectionFetchWatchHandle);
}

export function* collectionAddFetchWatch() {
  yield takeEvery(COLLECTION_ADD.REQUEST, collectionAddFetchWatchHandle);
}

export function* collectionAddSuccessWatch() {
  yield takeEvery(COLLECTION_ADD.SUCCESS, collectionAddSuccessWatchHandle);
}

export function* collectionRemoveFetchWatch() {
  yield takeEvery(COLLECTION_REMOVE.REQUEST, collectionRemoveFetchWatchHandle);
}

export function* collectionRemoveSuccessWatch() {
  yield takeEvery(COLLECTION_REMOVE.SUCCESS, collectionRemoveSuccessWatchHandle);
}
