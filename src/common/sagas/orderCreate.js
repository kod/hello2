import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { orderCreateFetchSuccess, orderCreateFetchFailure } from '../actions/orderCreate';
import { orderPayFetch } from '../actions/orderPay';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_CREATE } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import NavigatorService from '../../navigations/NavigatorService';

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

    let Key = 'tradeKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.order.create';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'ordertype',
          value: ordertype
        },
        {
          key: 'addrid',
          value: addrid
        },
        {
          key: 'currency',
          value: currency
        },
        {
          key: 'subject',
          value: subject
        },
        {
          key: 'remark',
          value: remark
        },
        {
          key: 'goodsdetail',
          value: goodsdetail
        },
        {
          key: 'mergedetail',
          value: mergedetail
        },
        {
          key: 'coupondetail',
          value: coupondetail
        },
      ],
      Key
    );
    
    const response = yield apply(buyoo, buyoo.orderCreate, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        currency: currency,
        ordertype: ordertype,
        addrid: addrid,
        goodsdetail: goodsdetail,
        mergedetail: mergedetail,
        coupondetail: coupondetail,
        subject: subject,
        remark: remark,
      }
    ]);

    if (response.code !== 10000) {
      yield put(orderCreateFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(orderCreateFetchSuccess({
      BYtype,
      BYpayway,
      tradeNo: response.result.tradeNo,
      orderNo: response.result.orderNo,
    }));
  } catch (err) {
    yield put(orderCreateFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* orderCreateFetchWatch(res) {
  yield takeEvery(ORDER_CREATE.REQUEST, orderCreateFetchWatchHandle);
}


export function* orderCreateSuccessWatchHandle(action) {
  try {
    const {
      tradeNo,
      orderNo,
      BYtype,
      BYpayway,
    } = action.payload;
    switch (BYtype) {
      case 'normal':
        yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [ 'orderWriteCallBack', {
          type: 'orderCreateSuccess',
          params: {
            tradeNo,
            orderNo,
          },
        }]);
        break;

      case 'billPay':

        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: BYpayway,
            paypassword: '123456',
            BYtype,
          })
        );
  
        break;

      case 'Prepaid':

        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: BYpayway,
            paypassword: '123456',
            BYtype,
          })
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
