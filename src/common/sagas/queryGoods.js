import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from '../constants';
import { queryGoodsFetchSuccess, queryGoodsFetchFailure } from '../actions/queryGoods';
import { billPriceFetch, } from '../actions/bill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_GOODS } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

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

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.user.consume.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
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
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        createtime: createtime,
      }
    ];

    const response = yield apply(buyoo, buyoo.queryGoods, options);

    if (response.code !== 10000) {
      yield put(queryGoodsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    let items = [];

    for (let index = 0; index < response.result.length; index += 1) {
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
