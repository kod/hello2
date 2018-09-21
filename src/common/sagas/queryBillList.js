import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  queryBillListFetchSuccess,
  queryBillListFetchFailure,
} from '../actions/queryBillList';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_BILL_LIST } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* queryBillListFetchWatchHandle(action) {
  const funid = yield select(getAuthUserFunid);
  try {
    const { page, rows, period } = action.payload;

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.queryList';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

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
          key: 'period',
          value: period,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.queryBillList, [
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
        period,
      },
    ]);

    const { code, details, msg = '' } = response;

    if (code !== 10000) {
      yield put(queryBillListFetchFailure());
      yield put(addError(`msg: ${msg}; code: ${code}`));
    } else {
      yield put(queryBillListFetchSuccess(details, period));
    }
  } catch (err) {
    yield put(queryBillListFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* queryBillListFetchWatch() {
  yield takeEvery(QUERY_BILL_LIST.REQUEST, queryBillListFetchWatchHandle);
}
