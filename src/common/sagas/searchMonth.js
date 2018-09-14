import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
// import { SCREENS } from '../constants';
import {
  searchMonthFetchSuccess,
  searchMonthFetchFailure,
} from '../actions/searchMonth';
import { billPriceFetch, billTotalPriceFetch } from '../actions/bill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { SEARCH_MONTH } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid, getSearchMonthItem } from '../selectors';

export function* searchMonthFetchWatchHandle(action) {
  try {
    const { date } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.bill.searchMonth';
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
          key: 'date',
          value: date,
        },
      ],
      Key,
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
        date,
      },
    ];

    const response = yield apply(buyoo, buyoo.searchMonth, options);

    if (response.code !== 10000) {
      yield put(searchMonthFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        searchMonthFetchSuccess({
          result: response.result,
        }),
      );
    }
  } catch (err) {
    yield put(searchMonthFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* searchMonthFetchWatch() {
  yield takeEvery(SEARCH_MONTH.REQUEST, searchMonthFetchWatchHandle);
}

export function* searchMonthSuccessWatchHandle() {
  try {
    // const {
    //   isHaveBill
    // } = action.payload;
    // getSearchMonthItem,
    // getBillByYearItems,
    // getBillNowYear,
    // getBillNowMonth,

    const searchMonthItem = yield select(getSearchMonthItem);
    // const billByYearItems = yield select(getBillByYearItems);
    // const billNowYear = yield select(getBillNowYear);
    // const billNowMonth = yield select(getBillNowMonth);
    let result = 0;
    result = searchMonthItem.totalWaitingAmount + searchMonthItem.waitingAmount;
    // if (searchMonthItem.totalWaitingAmount && billByYearItems[billNowYear]) {
    //   if (
    //     billByYearItems[billNowYear][billNowMonth - 1].status &&
    //     billByYearItems[billNowYear][billNowMonth - 1].status !== 10000
    //   ) {
    //     // result = 全部逾期待还的金额 + 当月待还金额（如果已出账）
    //     result =
    //       searchMonthItem.totalWaitingAmount +
    //       billByYearItems[billNowYear][billNowMonth - 1].waitingAmount;
    //   } else {
    //     result = searchMonthItem.totalWaitingAmount;
    //   }
    // }

    yield put(billPriceFetch(result.toString()));
    yield put(billTotalPriceFetch(result.toString()));
  } catch (err) {
    console.log(err);
  }
}

export function* searchMonthSuccessWatch() {
  yield takeEvery(SEARCH_MONTH.SUCCESS, searchMonthSuccessWatchHandle);
}
