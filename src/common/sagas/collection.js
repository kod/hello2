import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
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

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

export function* collectionFetchWatchHandle() {
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
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
      ],
      Key,
    );

    let response = yield apply(buyoo, buyoo.userGetCollection, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
        pagesize,
        currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(collectionFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      response = {
        ...response,
        details: response.details.map(val => {
          val.imageUrl = val.brandImage;
          val.name = val.brandName;
          val.price = val.brandPrice;
          return val;
        }),
      };
      yield put(collectionFetchSuccess(response));
    }
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
          value: funid,
        },
        {
          key: 'brandids',
          value: brandids,
        },
      ],
      Key,
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
        brandids,
      },
    ]);

    if (response.code !== 10000) {
      yield put(collectionAddFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(collectionAddFetchSuccess());
    }
  } catch (err) {
    yield put(collectionAddFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectionAddSuccessWatchHandle() {
  try {
    yield put(collectionFetch());
  } catch (err) {
    console.warn(err);
  }
}

export function* collectionRemoveFetchWatchHandle(action) {
  const { brand_id: brandId } = action.payload;
  try {
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);

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
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'brand_id',
          value: brandId,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.userCancelCollection, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
        brand_id: brandId,
      },
    ]);

    if (response.code !== 10000) {
      yield put(collectionRemoveFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(collectionRemoveFetchSuccess());
    }
  } catch (err) {
    yield put(collectionRemoveFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectionRemoveSuccessWatchHandle() {
  try {
    yield put(collectionFetch());
  } catch (err) {
    console.warn(err);
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
  yield takeEvery(
    COLLECTION_REMOVE.SUCCESS,
    collectionRemoveSuccessWatchHandle,
  );
}
