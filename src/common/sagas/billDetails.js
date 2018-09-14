import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  billDetailsFetchSuccess,
  billDetailsFetchFailure,
} from '../actions/billDetails';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BILL_DETAILS } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* billDetailsFetchWatchHandle(action) {
  try {
    const { summaryid = 1, date = '' } = action.payload;
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
          value: funid,
        },
        {
          key: 'summaryid',
          value: summaryid,
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
        summaryid,
        date,
      },
    ];

    const response = yield apply(buyoo, buyoo.billDetails, options);

    if (response.code !== 10000) {
      yield put(billDetailsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        billDetailsFetchSuccess({
          result: response.result,
        }),
      );
    }
  } catch (err) {
    yield put(billDetailsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* billDetailsFetchWatch() {
  yield takeEvery(BILL_DETAILS.REQUEST, billDetailsFetchWatchHandle);
}
