import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from '../constants';
import { orderCancelFetchSuccess, orderCancelFetchFailure } from '../actions/orderCancel';
import {
  cardQueryFetch,
} from '../actions/cardQuery';
import {
  queryOrderListFetch,
} from '../actions/queryOrderList';
import {
  queryOrderFetch,
} from '../actions/queryOrder';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_CANCEL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

import { getAuthUserFunid } from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* orderCancelFetchWatchHandle(action) {
  try {
    const {
      tradeno,
      orderno,
      status,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'tradeKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.orderCancel';
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
          key: 'orderno',
          value: orderno
        },
        {
          key: 'tradeno',
          value: tradeno
        },
        {
          key: 'status',
          value: status
        }
      ],
      Key
    );

    const options = [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        orderno: orderno,
        tradeno: tradeno,
        status: status
      }
    ];

    const response = yield apply(buyoo, buyoo.orderCancel, options);

    if (response.code !== 10000) {
      yield put(orderCancelFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(
      orderCancelFetchSuccess({
        orderno: orderno,
        tradeno: tradeno,
      })
    );
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
    const {
      orderno,
      tradeno,
    } = action.payload;
    // yield NavigatorService.navigate(SCREENS.Pay, {
    //   tradeNo,
    //   orderNo,
    // });
    yield put(
      queryOrderFetch({
        orderNo: orderno,
        tradeNo: tradeno,
      })
    );
    yield put(
      queryOrderListFetch({
        index: 0,
        status: '99999',
      })
    );
    yield put(
      queryOrderListFetch({
        index: 1,
        status: '10000',
      })
    );

  } catch (err) {
    
  }
}

export function* orderCancelSuccessWatch() {
  yield takeEvery(ORDER_CANCEL.SUCCESS, orderCancelSuccessWatchHandle);
}
