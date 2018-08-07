import { Platform, Alert, ToastAndroid } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  judgeVoucherFetch,
  judgeVoucherFetchSuccess,
  judgeVoucherFetchFailure,
} from '../actions/judgeVoucher';
import {
  getVoucherFetch,
} from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  JUDGE_VOUCHER,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import NavigatorService from '../../navigations/NavigatorService';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

import i18n from '../helpers/i18n';

export function* judgeVoucherFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const {
      products = '',
      currentpage = 1,
      pagesize = 100,
    } = action.payload;

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.usercenter.judgeVoucher';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signTypeMD5(appId, method, charset, Key, true);

    var encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'products',
          value: products
        },
        {
          key: 'currentpage',
          value: currentpage
        },
        {
          key: 'pagesize',
          value: pagesize
        }
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.judgeVoucher, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        products: products,
        currentpage: currentpage,
        pagesize: pagesize
      }
    ]);
    console.log(response);

    if (response.code !== 10000) {
      yield put(judgeVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(judgeVoucherFetchSuccess({
      items: response.details,
    }));
  } catch (err) {
    yield put(judgeVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* judgeVoucherFetchWatch() {
  yield takeEvery(JUDGE_VOUCHER.REQUEST, judgeVoucherFetchWatchHandle);
}

export function* judgeVoucherSuccessWatchHandle() {
  try {
    yield put(getVoucherFetch());
    // if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* judgeVoucherSuccessWatch() {
  yield takeEvery(JUDGE_VOUCHER.SUCCESS, judgeVoucherSuccessWatchHandle);
}
