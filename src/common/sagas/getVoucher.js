import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  getVoucherFetchSuccess,
  getVoucherFetchFailure,
} from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  GET_VOUCHER,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import { getAuthUserFunid, getAuthUser } from '../selectors';

export function* getVoucherFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser) || '';
    const funid = authUser ? yield select(getAuthUserFunid) : '';

    const {
      vouchertype = '',
      typeid = '',
      brandid = '',
      productid = '',
      currentpage = '1',
      pagesize = '100',
    } = action.payload;

    let Key = 'marketKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.market.getVoucher';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';
  
    let signType = signTypeMD5(appId, method, charset, Key, true);

    let encrypt = encryptMD5(
      [
        {
          key: 'vouchertype',
          value: vouchertype
        },
        {
          key: 'funid',
          value: funid
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

    let response = yield apply(buyoo, buyoo.getVoucher, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        vouchertype: vouchertype,
        funid: funid,
        typeid: typeid,
        brandid: brandid,
        productid: productid,
        currentpage: currentpage,
        pagesize: pagesize
      }
    ]);

    if (response.code !== 10000) {
      yield put(getVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(getVoucherFetchSuccess(response.details));
  } catch (err) {
    yield put(getVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherFetchWatch() {
  yield takeEvery(GET_VOUCHER.REQUEST, getVoucherFetchWatchHandle);
}
