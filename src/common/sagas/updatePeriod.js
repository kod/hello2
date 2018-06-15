import { Platform, ToastAndroid, Alert, } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  updatePeriodFetch,
  updatePeriodFetchSuccess,
  updatePeriodFetchFailure,
} from '../actions/updatePeriod';
import {
  cardQueryFetch,
} from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import {
  UPDATE_PERIOD,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import NavigatorService from '../../navigations/NavigatorService';

import { SCREENS } from "../constants";

import { getAuthUserFunid } from '../selectors';

export function* updatePeriodFetchWatchHandle(action) {
  try {
    const {
      period,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);
    
    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.account.period';
    const charset = 'utf-8';
    const timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    const version = '2.0';

    const signType = signType_MD5(appId, method, charset, Key, true);
  
    const encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'period',
          value: period
        },
      ],
      Key
    );
    console.log({
      appid: appId,
      method: method,
      charset: charset,
      signtype: signType,
      encrypt: encrypt,
      timestamp: timestamp,
      version: version,
      funid: funid,
      period: period,
    });
    let response = yield apply(buyoo, buyoo.updatePeriod, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        period: period,
      }
    ]);

    console.log(response);
    if (response.code !== 10000) {
      yield put(updatePeriodFetchFailure());
      yield put(addError(response.msg));
      return false;
    }
    yield put(updatePeriodFetchSuccess());

  } catch (err) {
    yield put(updatePeriodFetchFailure());
    yield put(addError(err.toString()));
  }
}
export function* updatePeriodFetchWatch() {
  yield takeEvery(UPDATE_PERIOD.REQUEST, updatePeriodFetchWatchHandle);
}

export function* updatePeriodSuccessWatchHandle(action) {
  try {
    if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
    yield put(cardQueryFetch());
    NavigatorService.pop(1);
  } catch (error) {
    console.log(error);
  }
}

export function* updatePeriodSuccessWatch() {
  yield takeEvery(UPDATE_PERIOD.SUCCESS, updatePeriodSuccessWatchHandle);
}
