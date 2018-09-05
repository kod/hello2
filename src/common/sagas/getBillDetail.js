import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';

import {
  getBillDetailFetchSuccess,
  getBillDetailFetchFailure,
} from '../actions/getBillDetail';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_BILL_DETAIL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* getBillDetailFetchWatchHandle(action) {
  const { expiredate } = action.payload;
  try {
    const funid = yield select(getAuthUserFunid);

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.bill.getBillDetail';
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
          key: 'expiredate',
          value: expiredate,
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
        expiredate,
      },
    ];

    const response = yield apply(buyoo, buyoo.getBillDetail, options);
    console.log('responseresponseresponseresponse');
    console.log(response);

    if (response.code !== 10000) {
      yield put(getBillDetailFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getBillDetailFetchSuccess({
          result: response.result,
        }),
      );
    }
  } catch (err) {
    console.log('errerrerrerrerrerrerrerrerr');
    console.log(err);
    yield put(getBillDetailFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getBillDetailFetchWatch() {
  yield takeEvery(GET_BILL_DETAIL.REQUEST, getBillDetailFetchWatchHandle);
}

// export function* getBillDetailSuccessWatchHandle() {
//   try {

//   } catch (err) {
//     console.log(err);
//   }
// }

// export function* getBillDetailSuccessWatch() {
//   yield takeEvery(GET_BILL_DETAIL.SUCCESS, getBillDetailSuccessWatchHandle);
// }
