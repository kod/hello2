import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { searchMonthFetchSuccess, searchMonthFetchFailure } from '../actions/searchMonth';
import { billPriceFetch, } from '../actions/bill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { SEARCH_MONTH } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import {
  getAuthUserFunid,
  getSearchMonthItem,
  getBillByYearItems,
  getBillNowYear,
  getBillNowMonth,
} from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* searchMonthFetchWatchHandle(action) {
  try {
    const {
      date,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'settleKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.bill.searchMonth';
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
          key: 'date',
          value: date
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
        date: date,
      }
    ];

    const response = yield apply(buyoo, buyoo.searchMonth, options);

    if (response.code !== 10000) {
      yield put(searchMonthFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(searchMonthFetchSuccess({
      result: response.result,
    }));
  } catch (err) {
    yield put(searchMonthFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* searchMonthFetchWatch(res) {
  yield takeEvery(SEARCH_MONTH.REQUEST, searchMonthFetchWatchHandle);
}


export function* searchMonthSuccessWatchHandle(action) {
  try {
    // const {
    //   isHaveBill
    // } = action.payload;
    // getSearchMonthItem,
    // getBillByYearItems,
    // getBillNowYear,
    // getBillNowMonth,
  
    const searchMonthItem = yield select(getSearchMonthItem);
    const billByYearItems = yield select(getBillByYearItems);
    const billNowYear = yield select(getBillNowYear);
    const billNowMonth = yield select(getBillNowMonth);
    let result = 0;
    if (searchMonthItem.totalWaitingAmount && billByYearItems[billNowYear]) {
      if (billByYearItems[billNowYear][billNowMonth - 1].status && billByYearItems[billNowYear][billNowMonth - 1].status !== 10000) {
        result = searchMonthItem.totalWaitingAmount + billByYearItems[billNowYear][billNowMonth - 1].waitingAmount;
      } else {
        result = searchMonthItem.totalWaitingAmount;
      }
    }

    yield put(billPriceFetch(result.toString()));

  } catch (err) {
    
  }
}

export function* searchMonthSuccessWatch() {
  yield takeEvery(SEARCH_MONTH.SUCCESS, searchMonthSuccessWatchHandle);
}
