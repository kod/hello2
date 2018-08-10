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

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.getcollection';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';
  
    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
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

    const response = yield apply(buyoo, buyoo.userGetCollection, [
      {
        appId: appId,
        method,
        charset,
        signType: signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
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

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.addcollection';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';
  
    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
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

    const response = yield apply(buyoo, buyoo.userBatchCollection, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
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

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.cancelcollection';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';
  
    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
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

    const response = yield apply(buyoo, buyoo.userCancelCollection, [
      {
        appId: appId,
        method,
        charset,
        signType: signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
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
