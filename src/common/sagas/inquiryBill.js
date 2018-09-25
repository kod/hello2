import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  inquiryBillFetchSuccess,
  inquiryBillFetchFailure,
} from '../actions/inquiryBill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { INQUIRY_BILL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

// import { getAuthUserFunid } from '../selectors';

export function* inquiryBillFetchWatchHandle(action) {
  // const funid = yield select(getAuthUserFunid);
  try {
    const { orderNo, tradeNo, useraccount, notifyUrlBg } = action.payload;

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.inquiryBill';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'orderNo',
          value: orderNo,
        },
        {
          key: 'tradeNo',
          value: tradeNo,
        },
        {
          key: 'useraccount',
          value: useraccount,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.inquiryBill, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        notifyUrlBg,
        orderNo,
        tradeNo,
        useraccount,
      },
    ]);

    const { code, detail, msg = '' } = response;

    if (code !== 10000) {
      yield put(inquiryBillFetchFailure());
      yield put(addError(`msg: ${msg}; code: ${code}`));
    } else {
      yield put(inquiryBillFetchSuccess(detail));
    }
  } catch (err) {
    yield put(inquiryBillFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* inquiryBillFetchWatch() {
  yield takeEvery(INQUIRY_BILL.REQUEST, inquiryBillFetchWatchHandle);
}
