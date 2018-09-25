// import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  payNormalOrderFetchSuccess,
  payNormalOrderFetchFailure,
} from '../actions/payNormalOrder';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PAY_NORMAL_ORDER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import { SCREENS } from '../constants';

import { getAuthUserFunid } from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* payNormalOrderFetchWatchHandle(action) {
  const funid = yield select(getAuthUserFunid);
  try {
    const {
      orderNo,
      tradeNo,
      totalAmount,
      repaymentMonth,
      payway,
      paypassword,
    } = action.payload;

    const Key = 'tradeKey';
    const appId = funid;
    const method = 'fun.trade.paynormal';
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
          key: 'repaymentMonth',
          value: repaymentMonth,
        },
        {
          key: 'totalAmount',
          value: totalAmount,
        },
        {
          key: 'payway',
          value: payway,
        },
        {
          key: 'paypassword',
          value: paypassword,
        },
      ],
      Key,
    );

    const options = {
      appId,
      method,
      charset,
      signType,
      encrypt,
      timestamp,
      version,
      orderNo,
      tradeNo,
      repaymentMonth,
      totalAmount,
      payway,
      paypassword,
    };

    console.log('optionsoptionsoptionsoptions');
    console.log(options);
    if (payway === '2') {
      yield put(payNormalOrderFetchFailure());
      NavigatorService.navigate(SCREENS.WebView, {
        source: buyoo.payNormalOrderInternetBank(options),
      });
    } else {
      const response = yield apply(buyoo, buyoo.payNormalOrder, [
        {
          appId,
          method,
          charset,
          signType,
          encrypt,
          timestamp,
          version,
          orderNo,
          tradeNo,
          repaymentMonth,
          totalAmount,
          payway,
          paypassword,
        },
      ]);
      console.log(response);

      if (response.code !== 10000) {
        yield put(payNormalOrderFetchFailure());
        yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      } else {
        yield put(payNormalOrderFetchSuccess({}));
      }
    }
  } catch (err) {
    yield put(payNormalOrderFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* payNormalOrderFetchWatch() {
  yield takeEvery(PAY_NORMAL_ORDER.REQUEST, payNormalOrderFetchWatchHandle);
}
