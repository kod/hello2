import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  cityInfosFetch,
  cityInfosFetchSuccess,
  cityInfosFetchFailure,
} from '../actions/cityInfos';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  CITY_INFOS,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

// import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

export function* cityInfosFetchWatchHandle(action) {
  try {
    const {
      pid,
      level,
    } = action.payload;

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.getCityInfos';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'pid',
          value: pid
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.getCityInfos, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        pid: pid,
      }
    ]);

    if (response.code !== 10000) {
      yield put(cityInfosFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(cityInfosFetchSuccess(response.details, level));
  } catch (err) {
    yield put(cityInfosFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* cityInfosFetchWatch() {
  yield takeEvery(CITY_INFOS.REQUEST, cityInfosFetchWatchHandle);
}
