import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { queryOrderFetchSuccess, queryOrderFetchFailure } from '../actions/queryOrder';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_ORDER } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import NavigatorService from '../../navigations/NavigatorService';

export function* queryOrderFetchWatchHandle(action) {
  try {
    const {
      orderNo,
      tradeNo,
    } = action.payload;

    let Key = 'tradeKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.query';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'orderNo',
          value: orderNo
        },
        {
          key: 'tradeNo',
          value: tradeNo
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.queryOrder, [
      {
        // appId: 'VNOYX9GI72QE',
        // method: 'fun.trade.query',
        // charset: 'utf-8',
        // signType: 'b898f6ea1375b8f0871ef0c4a719b739',
        // encrypt: '722ea6ebd6a65b41dc8610d5b2180527',
        // timestamp: '2018-06-06 17:38:56',
        // version: '2.0',
        // orderNo: '220180606173139579374083127',
        // tradeNo: '210320180606173139579121',
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        orderNo: orderNo,
        tradeNo: tradeNo,
      }
    ]);

    response = {
      ...response,
      goodsDetail: response.goodsDetail.map((val, key) => {
        val.price = val.totalAmount;
        val.orgPrice = val.totalOrgAmount;
        val.imageUrl = val.iconUrl;
        return val;
      })
    }

    if (response.code !== 10000) {
      yield put(queryOrderFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(queryOrderFetchSuccess(response));
  } catch (err) {
    yield put(queryOrderFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* queryOrderFetchWatch(res) {
  yield takeEvery(QUERY_ORDER.REQUEST, queryOrderFetchWatchHandle);
}


export function* queryOrderSuccessWatchHandle(action) {
  try {
    const { tradeNo, orderNo } = action.payload;
    yield NavigatorService.navigate(SCREENS.Pay, {
      tradeNo,
      orderNo,
    });
  } catch (err) {
    
  }
}

export function* queryOrderSuccessWatch() {
  yield takeEvery(QUERY_ORDER.SUCCESS, queryOrderSuccessWatchHandle);
}
