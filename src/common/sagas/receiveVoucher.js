import { Platform, Alert, ToastAndroid } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  receiveVoucherFetch,
  receiveVoucherFetchSuccess,
  receiveVoucherFetchFailure,
} from '../actions/receiveVoucher';
import {
  getVoucherFetch,
} from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  RECEIVE_VOUCHER,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

import NavigatorService from '../../navigations/NavigatorService';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

import i18n from '../helpers/i18n';

export function* receiveVoucherFetchWatchHandle(action) {
  try {
    const {
      voucherid,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.usercenter.receiveVoucher';
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
          key: 'voucherid',
          value: voucherid
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.receiveVoucher, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        voucherid: voucherid,
      }
    ]);

    if (response.code !== 10000) {
      yield put(receiveVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(receiveVoucherFetchSuccess());
  } catch (err) {
    yield put(receiveVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* receiveVoucherFetchWatch() {
  yield takeEvery(RECEIVE_VOUCHER.REQUEST, receiveVoucherFetchWatchHandle);
}

export function* receiveVoucherSuccessWatchHandle() {
  try {
    yield put(getVoucherFetch());
    if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* receiveVoucherSuccessWatch() {
  yield takeEvery(RECEIVE_VOUCHER.SUCCESS, receiveVoucherSuccessWatchHandle);
}
