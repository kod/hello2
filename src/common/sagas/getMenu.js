import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { getMenuFetchSuccess, getMenuFetchFailure } from '../actions/getMenu';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_MENU } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import { getAuthUserFunid, getAuthUser } from '../selectors';

export function* getMenuFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser) || '';
    const funid = authUser ? yield select(getAuthUserFunid) : '';
    const {
      typeid = 0,
      subclassfyid = 0,
      thirdclassfyid = 0,
    } = action.payload;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.commodity.menu';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'typeid',
          value: typeid
        },
        {
          key: 'subclassfyid',
          value: subclassfyid
        },
        {
          key: 'thirdclassfyid',
          value: thirdclassfyid
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.getMenu, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        typeid: typeid,
        subclassfyid: subclassfyid,
        thirdclassfyid: thirdclassfyid
      }
    ]);

    if (response.code !== 10000) {
      yield put(getMenuFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(getMenuFetchSuccess({
      levelOne: response.result,
      levelTwo: response.result.map((val, key) => {
        return val.classfy;
      }),
    }));
  } catch (err) {
    yield put(getMenuFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getMenuFetchWatch() {
  yield takeEvery(GET_MENU.REQUEST, getMenuFetchWatchHandle);
}
