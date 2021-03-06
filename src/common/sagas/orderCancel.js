import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  orderCancelFetchSuccess,
  orderCancelFetchFailure,
} from '../actions/orderCancel';
import { queryOrderListFetch } from '../actions/queryOrderList';
import { queryOrderFetch } from '../actions/queryOrder';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_CANCEL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* orderCancelFetchWatchHandle(action) {
  try {
    const { tradeno, orderno, status } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'tradeKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.orderCancel';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'orderno',
          value: orderno,
        },
        {
          key: 'tradeno',
          value: tradeno,
        },
        {
          key: 'status',
          value: status,
        },
      ],
      Key,
    );

    const options = [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        orderno,
        tradeno,
        status,
      },
    ];

    const response = yield apply(buyoo, buyoo.orderCancel, options);

    if (response.code !== 10000) {
      yield put(orderCancelFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        orderCancelFetchSuccess({
          orderno,
          tradeno,
        }),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(orderCancelFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* orderCancelFetchWatch() {
  yield takeEvery(ORDER_CANCEL.REQUEST, orderCancelFetchWatchHandle);
}

export function* orderCancelSuccessWatchHandle(action) {
  try {
    const { orderno, tradeno } = action.payload;
    yield put(
      queryOrderFetch({
        orderNo: orderno,
        tradeNo: tradeno,
      }),
    );
    yield put(
      queryOrderListFetch({
        index: 0,
        status: '99999',
      }),
    );
    yield put(
      queryOrderListFetch({
        index: 1,
        status: '10000',
      }),
    );
  } catch (err) {
    console.warn(err);
  }
}

export function* orderCancelSuccessWatch() {
  yield takeEvery(ORDER_CANCEL.SUCCESS, orderCancelSuccessWatchHandle);
}
