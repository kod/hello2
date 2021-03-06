import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  getVoucherFetchSuccess,
  getVoucherFetchFailure,
} from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_VOUCHER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

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

    const Key = 'marketKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.market.getVoucher';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'vouchertype',
          value: vouchertype,
        },
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'typeid',
          value: typeid,
        },
        {
          key: 'brandid',
          value: brandid,
        },
        {
          key: 'productid',
          value: productid,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getVoucher, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        vouchertype,
        funid,
        typeid,
        brandid,
        productid,
        currentpage,
        pagesize,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getVoucherFetchSuccess(response.details));
    }
  } catch (err) {
    yield put(getVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherFetchWatch() {
  yield takeEvery(GET_VOUCHER.REQUEST, getVoucherFetchWatchHandle);
}
