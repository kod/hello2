import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { findProductsFetchSuccess, findProductsFetchFailure } from '../actions/findProducts';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { FIND_PRODUCTS } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import { getAuthUserFunid, } from '../selectors';

export function* findProductsFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const {
      findcontent,
      pagesize = 50,
      currentpage = 1,
    } = action.payload;
    
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.find.finding';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '1.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'findcontent',
          value: findcontent
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

    const response = yield apply(buyoo, buyoo.findProducts, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        findcontent: findcontent,
        pagesize: pagesize,
        currentpage: currentpage
      }
    ]);

    if (response.code !== 10000) {
      yield put(findProductsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(findProductsFetchSuccess(
      response.details.map((val, key) => {
        val.imageUrl = val.iconUrl;
        return val;
      }))
    );
  } catch (err) {
    yield put(findProductsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* findProductsFetchWatch() {
  yield takeEvery(FIND_PRODUCTS.REQUEST, findProductsFetchWatchHandle);
}
