import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
// import { NavigationActions } from 'react-navigation';
// import { SCREENS } from '../constants';
import moment from 'moment';
import {
  queryOrderListFetchSuccess,
  queryOrderListFetchFailure,
} from '../actions/queryOrderList';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  QUERY_ORDER_LIST,
  QUERY_ORDER_LIST_INDEX,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import {
  getAuthUser,
  getAuthUserFunid,
  // getQueryOrderListScrollTabIndex,
  getQueryOrderListRows,
} from '../selectors';

export function* queryOrderListFetchWatchHandle(action) {
  try {
    const { page = 1, index = 0, status } = action.payload;
    // const scrollTabIndex =  yield select(getQueryOrderListScrollTabIndex);
    const rows = yield select(getQueryOrderListRows);
    const authUser = yield select(getAuthUser);

    const funid = authUser ? yield select(getAuthUserFunid) : '';

    const Key = 'tradeKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.queryList';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.1';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'page',
          value: page,
        },
        {
          key: 'rows',
          value: rows,
        },
        {
          key: 'status',
          value: status,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.queryOrderList, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        page,
        rows,
        status,
      },
    ]);

    if (response.code !== 10000) {
      yield put(queryOrderListFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        queryOrderListFetchSuccess({
          page,
          index,
          count: response.count,
          result: response.details.map(val => ({
            ...val,
            goodList: val.goodList.map(val1 => ({
              ...val1,
              imageUrl: val1.iconUrl,
              price: val1.totalAmount,
              propertiesIds: '',
            })),
          })),
          // tradeNo: response.result.tradeNo,
          // orderNo: response.result.orderNo,
        }),
      );
    }
  } catch (err) {
    yield put(queryOrderListFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* queryOrderListFetchWatch() {
  yield takeEvery(QUERY_ORDER_LIST.REQUEST, queryOrderListFetchWatchHandle);
}

export function* queryOrderListSuccessWatchHandle() {
  // try {
  // } catch (err) {}
}

export function* queryOrderListSuccessWatch() {
  yield takeEvery(QUERY_ORDER_LIST.SUCCESS, queryOrderListSuccessWatchHandle);
}

export function* queryOrderListIndexFetchWatchHandle() {
  // try {
  //   const {
  //     type,
  //   } = action.payload;
  //   if (type !== 'open') return false;
  // } catch (err) {}
}

export function* queryOrderListIndexFetchWatch() {
  yield takeEvery(
    QUERY_ORDER_LIST_INDEX.REQUEST,
    queryOrderListIndexFetchWatchHandle,
  );
}
