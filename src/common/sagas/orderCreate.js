import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import { SCREENS, INTERNET_BANK_PAYWAY } from '../constants';
import {
  orderCreateFetchSuccess,
  orderCreateFetchFailure,
} from '../actions/orderCreate';
import { orderPayFetch } from '../actions/orderPay';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_CREATE } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* orderCreateFetchWatchHandle(action) {
  try {
    const {
      BYtype = 'normal',
      BYpayway = '1',
      currency = 'VN',
      ordertype = '1',
      addrid = '',
      goodsdetail = '',
      mergedetail = '',
      coupondetail = '',
      subject = '',
      remark = '',
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'tradeKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.order.create';
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
          key: 'ordertype',
          value: ordertype,
        },
        {
          key: 'addrid',
          value: addrid,
        },
        {
          key: 'currency',
          value: currency,
        },
        {
          key: 'subject',
          value: subject,
        },
        {
          key: 'remark',
          value: remark,
        },
        {
          key: 'goodsdetail',
          value: goodsdetail,
        },
        {
          key: 'mergedetail',
          value: mergedetail,
        },
        {
          key: 'coupondetail',
          value: coupondetail,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.orderCreate, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        currency,
        ordertype,
        addrid,
        goodsdetail,
        mergedetail,
        coupondetail,
        subject,
        remark,
      },
    ]);
    if (response.code !== 10000) {
      yield put(orderCreateFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        orderCreateFetchSuccess({
          BYtype,
          BYpayway,
          tradeNo: response.result.tradeNo,
          orderNo: response.result.orderNo,
        }),
      );
    }
  } catch (err) {
    yield put(orderCreateFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* orderCreateFetchWatch() {
  yield takeEvery(ORDER_CREATE.REQUEST, orderCreateFetchWatchHandle);
}

export function* orderCreateSuccessWatchHandle(action) {
  try {
    const { tradeNo, orderNo, BYtype, BYpayway } = action.payload;
    switch (BYtype) {
      case 'normal':
        yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [
          SCREENS.OrderWrite,
          {
            type: 'orderCreateSuccess',
            params: {
              tradeNo,
              orderNo,
            },
          },
        ]);
        break;

      case 'billPay':
        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            // payway: INTERNET_BANK_PAYWAY, // 账单还款全部使用网银
            payway: BYpayway,
            // paypassword: '123456',
            BYtype,
          }),
        );
        break;

      case 'Prepaid':
        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: INTERNET_BANK_PAYWAY, // 充值目前只支持网银
            // payway: BYpayway,
            // paypassword: '123456',
            BYtype,
          }),
        );
        break;

      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

export function* orderCreateSuccessWatch() {
  yield takeEvery(ORDER_CREATE.SUCCESS, orderCreateSuccessWatchHandle);
}
