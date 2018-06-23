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
      yield put(addError(response.msg));
      return false;
    }

    yield put(orderCreateFetchSuccess({
      BYtype,
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
    } = action.payload;
    switch (BYtype) {
      case 'normal':
        yield NavigatorService.navigate(SCREENS.Pay, {
          tradeNo,
          orderNo,
        });
        break;

      case 'billPay':

    // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [ 'billPayResult', {
    //   name: 'haha',
    //   age: 18
    // }]);

        yield put(
          orderPayFetch({
            orderno: orderNo,
            tradeno: tradeNo,
            payway: 1,
            paypassword: '123456',
            BYtype,
          })
        );
  
        break;
    
      default:
        break;
    }
  } catch (err) {
    
  }
}

export function* orderCreateSuccessWatch() {
  yield takeEvery(ORDER_CREATE.SUCCESS, orderCreateSuccessWatchHandle);
}
