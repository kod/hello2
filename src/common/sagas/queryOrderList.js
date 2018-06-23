import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { queryOrderListFetchSuccess, queryOrderListFetchFailure } from '../actions/queryOrderList';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_ORDER_LIST, QUERY_ORDER_LIST_INDEX } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import NavigatorService from '../../navigations/NavigatorService';

import {
  getAuthUserFunid,
  getQueryOrderListScrollTabIndex,
  getQueryOrderListRows,
} from '../selectors';

export function* queryOrderListFetchWatchHandle(action) {
  try {
    const {
      page = 1,
      status,
    } = action.payload;
    const scrollTabIndex = yield select(getQueryOrderListScrollTabIndex);
    const rows = yield select(getQueryOrderListRows);
    const funid = yield select(getAuthUserFunid);

    let Key = 'tradeKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.queryList';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.1';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'page',
          value: page
        },
        {
          key: 'rows',
          value: rows
        },
        {
          key: 'status',
          value: status
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
        page: page,
        rows: rows,
        status: status,
      }
    ]);

    if (response.code !== 10000) {
      yield put(queryOrderListFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(queryOrderListFetchSuccess({
      page,
      index: scrollTabIndex,
      count: response.count,
      result: response.details.map((val, key) => {
        return {
          ...val,
          goodList: val.goodList.map((val1, key1) => {
            return {
              ...val1,
              imageUrl: val1.iconUrl,
              price: val1.totalAmount,
              propertiesIds: '',
            }
          }),
        }
      }),
      // tradeNo: response.result.tradeNo,
      // orderNo: response.result.orderNo,
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
    // const { tradeNo, orderNo } = action.payload;
    // yield NavigatorService.navigate(SCREENS.Pay, {
    //   tradeNo,
    //   orderNo,
    // });
  } catch (err) {
    
  }
}

export function* queryOrderListSuccessWatch() {
  yield takeEvery(QUERY_ORDER_LIST.SUCCESS, queryOrderListSuccessWatchHandle);
}

export function* queryOrderListIndexFetchWatchHandle(action) {
  try {
    const {
      type,
    } = action.payload;
    if (type !== 'open') return false;


    // yield NavigatorService.navigate(SCREENS.Pay, {
    //   tradeNo,
    //   orderNo,
    // });
  } catch (err) {
    
  }
}

export function* queryOrderListIndexFetchWatch() {
  yield takeEvery(QUERY_ORDER_LIST_INDEX.REQUEST, queryOrderListIndexFetchWatchHandle);
}
