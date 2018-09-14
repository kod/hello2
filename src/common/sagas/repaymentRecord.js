import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  repaymentRecordFetchSuccess,
  repaymentRecordFetchFailure,
} from '../actions/repaymentRecord';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { REPAYMENT_RECORD } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* repaymentRecordFetchWatchHandle(action) {
  try {
    const { currentpage = 1, pagesize = 20 } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.bill.record';
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
          key: 'currentpage',
          value: currentpage,
        },
        {
          key: 'pagesize',
          value: pagesize,
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
        currentpage,
        pagesize,
      },
    ];

    const response = yield apply(buyoo, buyoo.repaymentRecord, options);

    if (response.code !== 10000) {
      yield put(repaymentRecordFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        repaymentRecordFetchSuccess({
          result: response.result,
        }),
      );
    }
  } catch (err) {
    yield put(repaymentRecordFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* repaymentRecordFetchWatch() {
  yield takeEvery(REPAYMENT_RECORD.REQUEST, repaymentRecordFetchWatchHandle);
}
