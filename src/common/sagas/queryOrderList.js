import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { queryOrderListFetchSuccess, queryOrderListFetchFailure } from '../actions/queryOrderList';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_ORDER_LIST } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import NavigatorService from '../../navigations/NavigatorService';

import { getAuthUserFunid } from '../selectors';

export function* queryOrderListFetchWatchHandle(action) {
  try {
    const {
      currency = 'VN',
      ordertype,
      addrid,
      goodsdetail,
      mergedetail,
      coupondetail,
      subject,
      remark = '',
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'tradeKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.order.create';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
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

    const response = yield apply(buyoo, buyoo.queryOrderList, [
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

    console.log(JSON.stringify({
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
    ));

    console.log(response);
    console.log(JSON.stringify(response));

    if (response.code !== 10000) {
      yield put(queryOrderListFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(queryOrderListFetchSuccess({
      tradeNo: response.result.tradeNo,
      orderNo: response.result.orderNo,
    }));
  } catch (err) {
    yield put(queryOrderListFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* queryOrderListFetchWatch(res) {
  yield takeEvery(QUERY_ORDER_LIST.REQUEST, queryOrderListFetchWatchHandle);
}


export function* queryOrderListSuccessWatchHandle(action) {
  try {
    const { tradeNo, orderNo } = action.payload;
    yield NavigatorService.navigate(SCREENS.Pay, {
      tradeNo,
      orderNo,
    });
  } catch (err) {
    
  }
}

export function* queryOrderListSuccessWatch() {
  yield takeEvery(QUERY_ORDER_LIST.SUCCESS, queryOrderListSuccessWatchHandle);
}
