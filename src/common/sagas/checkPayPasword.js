import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  checkPayPaswordFetchSuccess,
  checkPayPaswordFetchFailure,
} from '../actions/checkPayPasword';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { CHECK_PAY_PASWORD } from '../constants/actionTypes';
import { encryptMD5 } from '../../components/AuthEncrypt';

export function* checkPayPaswordFetchWatchHandle(action) {
  try {
    const { msisdn, paypassword } = action.payload;

    const Key = 'userKey';
    const provider = Platform.OS === 'ios' ? '1' : '2';

    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'paypassword',
          value: paypassword,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.checkPayPasword, [
      {
        provider,
        msisdn,
        paypassword,
        encryption: encrypt,
      },
    ]);

    const { code, result } = response;

    if (code !== 10000) {
      yield put(checkPayPaswordFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(checkPayPaswordFetchSuccess(result));
    }
  } catch (err) {
    yield put(checkPayPaswordFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* checkPayPaswordFetchWatch() {
  yield takeEvery(CHECK_PAY_PASWORD.REQUEST, checkPayPaswordFetchWatchHandle);
}
