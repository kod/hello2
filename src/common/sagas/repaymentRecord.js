import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { repaymentRecordFetchSuccess, repaymentRecordFetchFailure } from '../actions/repaymentRecord';
import { billPriceFetch, } from '../actions/bill';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { REPAYMENT_RECORD } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import {
  getAuthUserFunid,
  getrepaymentRecordItem,
  getBillByYearItems,
  getBillNowYear,
  getBillNowMonth,
} from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* repaymentRecordFetchWatchHandle(action) {
  try {
    const {
      currentpage = 1,
      pagesize = 20,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'settleKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.bill.record';
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
          key: 'currentpage',
          value: currentpage
        },
        {
          key: 'pagesize',
          value: pagesize
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
        currentpage: currentpage,
        pagesize: pagesize,
      }
    ];

    const response = yield apply(buyoo, buyoo.repaymentRecord, options);

    if (response.code !== 10000) {
      yield put(repaymentRecordFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(repaymentRecordFetchSuccess({
      result: response.result,
    }));
  } catch (err) {
    yield put(repaymentRecordFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* repaymentRecordFetchWatch(res) {
  yield takeEvery(REPAYMENT_RECORD.REQUEST, repaymentRecordFetchWatchHandle);
}


export function* repaymentRecordSuccessWatchHandle(action) {
  try {
    // const {
    //   isHaveBill
    // } = action.payload;
    // getrepaymentRecordItem,
    // getBillByYearItems,
    // getBillNowYear,
    // getBillNowMonth,
  
    // const repaymentRecordItem = yield select(getrepaymentRecordItem);
    // const billByYearItems = yield select(getBillByYearItems);
    // const billNowYear = yield select(getBillNowYear);
    // const billNowMonth = yield select(getBillNowMonth);
    // let result = 0;
    // if (repaymentRecordItem.totalWaitingAmount && billByYearItems[billNowYear]) {
    //   if (billByYearItems[billNowYear][billNowMonth - 1].status !== 10000) {
    //     result = repaymentRecordItem.totalWaitingAmount + billByYearItems[billNowYear][billNowMonth - 1].waitingAmount;
    //   } else {
    //     result = repaymentRecordItem.totalWaitingAmount;
    //   }
    // }

    // yield put(billPriceFetch(result.toString()));

  } catch (err) {
    
  }
}

export function* repaymentRecordSuccessWatch() {
  yield takeEvery(REPAYMENT_RECORD.SUCCESS, repaymentRecordSuccessWatchHandle);
}
