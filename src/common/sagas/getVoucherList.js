import { Platform, Alert, ToastAndroid } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  getVoucherListFetch,
  getVoucherListFetchSuccess,
  getVoucherListFetchFailure,
} from '../actions/getVoucherList';
import {
  getVoucherFetch,
} from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  GET_VOUCHER_LIST,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import NavigatorService from '../../navigations/NavigatorService';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

import i18n from '../helpers/i18n';

export function* getVoucherListFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const {
      vouchertype = '',
      typeid = '',
      brandid = '',
      productid = '',
      cardno = '',
      status = '1',
      currentpage = '1',
      pagesize = '100',
    } = action.payload;

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.usercenter.getVoucher';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    var encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'vouchertype',
          value: vouchertype
        },
        {
          key: 'typeid',
          value: typeid
        },
        {
          key: 'brandid',
          value: brandid
        },
        {
          key: 'productid',
          value: productid
        },
        {
          key: 'cardno',
          value: cardno
        },
        {
          key: 'status',
          value: status
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
  
    let response = yield apply(buyoo, buyoo.getVoucherList, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        vouchertype: vouchertype,
        typeid: typeid,
        brandid: brandid,
        productid: productid,
        cardno: cardno,
        status: status,
        currentpage: currentpage,
        pagesize: pagesize
      }
    ]);
    console.log(response);

    if (response.code !== 10000) {
      yield put(getVoucherListFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(getVoucherListFetchSuccess({
      items: response.details,
      status,
    }));
  } catch (err) {
    yield put(getVoucherListFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherListFetchWatch() {
  yield takeEvery(GET_VOUCHER_LIST.REQUEST, getVoucherListFetchWatchHandle);
}

export function* getVoucherListSuccessWatchHandle() {
  try {
    yield put(getVoucherFetch());
    if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherListSuccessWatch() {
  yield takeEvery(GET_VOUCHER_LIST.SUCCESS, getVoucherListSuccessWatchHandle);
}
