import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  judgeVoucherFetchSuccess,
  judgeVoucherFetchFailure,
} from '../actions/judgeVoucher';
import { getVoucherFetch } from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { JUDGE_VOUCHER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* judgeVoucherFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const { products = '', currentpage = 1, pagesize = 100 } = action.payload;

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.usercenter.judgeVoucher';
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
          key: 'products',
          value: products,
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

    const response = yield apply(buyoo, buyoo.judgeVoucher, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        products,
        currentpage,
        pagesize,
      },
    ]);

    if (response.code !== 10000) {
      yield put(judgeVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        judgeVoucherFetchSuccess({
          items: response.details,
        }),
      );
    }
  } catch (err) {
    yield put(judgeVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* judgeVoucherFetchWatch() {
  yield takeEvery(JUDGE_VOUCHER.REQUEST, judgeVoucherFetchWatchHandle);
}

export function* judgeVoucherSuccessWatchHandle() {
  try {
    yield put(getVoucherFetch());
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* judgeVoucherSuccessWatch() {
  yield takeEvery(JUDGE_VOUCHER.SUCCESS, judgeVoucherSuccessWatchHandle);
}
