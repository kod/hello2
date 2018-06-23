import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { queryGoodsFetchSuccess, queryGoodsFetchFailure } from '../actions/queryGoods';
import { billPriceFetch, } from '../actions/bill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_GOODS } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import {
  getAuthUserFunid,
} from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* queryGoodsFetchWatchHandle(action) {
  try {
    const {
      createtime,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.user.consume.query';
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
          key: 'createtime',
          value: createtime
        },
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
        createtime: createtime,
      }
    ];

    const response = yield apply(buyoo, buyoo.queryGoods, options);

    if (response.code !== 10000) {
      yield put(queryGoodsFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    let items = [];

    for (let index = 0; index < response.result.length; index++) {
      const element = response.result[index];
      items = [...items, ...element.goodList];
    }

    yield put(queryGoodsFetchSuccess({
      result: items,
    }));
  } catch (err) {
    yield put(queryGoodsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* queryGoodsFetchWatch(res) {
  yield takeEvery(QUERY_GOODS.REQUEST, queryGoodsFetchWatchHandle);
}


export function* queryGoodsSuccessWatchHandle(action) {
  try {
    // const {
    //   isHaveBill
    // } = action.payload;
    // getqueryGoodsItem,
    // getBillByYearItems,
    // getBillNowYear,
    // getBillNowMonth,
  
    // const queryGoodsItem = yield select(getqueryGoodsItem);
    // const billByYearItems = yield select(getBillByYearItems);
    // const billNowYear = yield select(getBillNowYear);
    // const billNowMonth = yield select(getBillNowMonth);
    // let result = 0;
    // if (queryGoodsItem.totalWaitingAmount && billByYearItems[billNowYear]) {
    //   if (billByYearItems[billNowYear][billNowMonth - 1].status !== 10000) {
    //     result = queryGoodsItem.totalWaitingAmount + billByYearItems[billNowYear][billNowMonth - 1].waitingAmount;
    //   } else {
    //     result = queryGoodsItem.totalWaitingAmount;
    //   }
    // }

    // yield put(billPriceFetch(result.toString()));

  } catch (err) {
    
  }
}

export function* queryGoodsSuccessWatch() {
  yield takeEvery(QUERY_GOODS.SUCCESS, queryGoodsSuccessWatchHandle);
}
