import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { billByYearFetchSuccess, billByYearFetchFailure } from '../actions/billByYear';
import { billDetailsFetch } from '../actions/billDetails';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BILL_BY_YEAR } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import { getAuthUserFunid } from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* billByYearFetchWatchHandle(action) {
  try {
    const {
      year,
      init = false,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    let Key = 'settleKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.bill.byyear';
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
          key: 'year',
          value: year
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
        year: year,
      }
    ];

    const response = yield apply(buyoo, buyoo.billByYear, options);

    let result = response.result;
    
    if (response.code !== 10000) {
      yield put(billByYearFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    const lengthNo = () => {
      return new Array(12).fill({});
    }

    const lengthYes = result => {
      let beforeMonth;
      let afterMonth;

      if (result.length === 1) {
        beforeMonth = parseInt(result[0].month.toString().slice(4, 6));
        afterMonth = parseInt(result[0].month.toString().slice(4, 6));
      } else {
        beforeMonth = parseInt(result[0].month.toString().slice(4, 6));
        afterMonth = parseInt(result[result.length - 1].month.toString().slice(4, 6));
      }
      
      const beforeNumber = beforeMonth - 1;
      const afterNumber = 12 - afterMonth;

      for (let index = 0; index < beforeNumber; index++) {
        result.unshift({});
      }

      for (let index = 0; index < afterNumber; index++) {
        result.push({});
      }

      return result;
    }

    result = result.length === 0 ? lengthNo() : lengthYes(result);

    
    let isHaveBill = init ? result.length !== 0 : true;

    let isOverdue = false;
    result = result.map((val, key) => {
      if (val.month) val.month = parseInt(val.month.toString().slice(4, 6));
      if (val.status === 10007) isOverdue = true;
      return val;
    });
    
    yield put(billByYearFetchSuccess({
      year,
      result,
      isOverdue,
      isHaveBill,
    }));
  } catch (err) {
    yield put(billByYearFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* billByYearFetchWatch(res) {
  yield takeEvery(BILL_BY_YEAR.REQUEST, billByYearFetchWatchHandle);
}


export function* billByYearSuccessWatchHandle(action) {
  try {
    const {
      isHaveBill
    } = action.payload;
    if (isHaveBill === false ) {
      Alert.alert(
        '',
        '您还没有产生账单',
        [
          { 
            text: '确定', 
            onPress: () => { NavigatorService.pop(1); }
          }
        ]
      )
    } else {
      // yield put(billDetailsFetch());
    }

  } catch (err) {
    
  }
}

export function* billByYearSuccessWatch() {
  yield takeEvery(BILL_BY_YEAR.SUCCESS, billByYearSuccessWatchHandle);
}
