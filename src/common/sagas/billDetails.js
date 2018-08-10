import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from '../constants';
import { billDetailsFetchSuccess, billDetailsFetchFailure } from '../actions/billDetails';
import { billPriceFetch, } from '../actions/bill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BILL_DETAILS } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

import {
  getAuthUserFunid,
  getbillDetailsItem,
  getBillByYearItems,
  getBillNowYear,
  getBillNowMonth,
} from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* billDetailsFetchWatchHandle(action) {
  try {
    const {
      summaryid = 1,
      date = '',
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.bill.details';
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
          key: 'summaryid',
          value: summaryid
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
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        summaryid: summaryid,
        date: date,
      }
    ];

    const response = yield apply(buyoo, buyoo.billDetails, options);

    if (response.code !== 10000) {
      yield put(billDetailsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(billDetailsFetchSuccess({
      result: response.result,
    }));
  } catch (err) {
    yield put(billDetailsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* billDetailsFetchWatch(res) {
  yield takeEvery(BILL_DETAILS.REQUEST, billDetailsFetchWatchHandle);
}


export function* billDetailsSuccessWatchHandle(action) {
  try {
    // const {
    //   isHaveBill
    // } = action.payload;
    // getbillDetailsItem,
    // getBillByYearItems,
    // getBillNowYear,
    // getBillNowMonth,
  
    // const billDetailsItem = yield select(getbillDetailsItem);
    // const billByYearItems = yield select(getBillByYearItems);
    // const billNowYear = yield select(getBillNowYear);
    // const billNowMonth = yield select(getBillNowMonth);
    // let result = 0;
    // if (billDetailsItem.totalWaitingAmount && billByYearItems[billNowYear]) {
    //   if (billByYearItems[billNowYear][billNowMonth - 1].status !== 10000) {
    //     result = billDetailsItem.totalWaitingAmount + billByYearItems[billNowYear][billNowMonth - 1].waitingAmount;
    //   } else {
    //     result = billDetailsItem.totalWaitingAmount;
    //   }
    // }

    // yield put(billPriceFetch(result.toString()));

  } catch (err) {
    
  }
}

export function* billDetailsSuccessWatch() {
  yield takeEvery(BILL_DETAILS.SUCCESS, billDetailsSuccessWatchHandle);
}
