import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { otpFetchSuccess, otpFetchFailure } from '../actions/otp';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { OTP } from '../constants/actionTypes';
import { encryptMD5 } from '../../components/AuthEncrypt';

export function* otpFetchWatchHandle(action) {
  try {
    const { msisdn, type = 1 } = action.payload;

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
          key: 'type',
          value: type,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.otp, [
      {
        provider,
        msisdn,
        type,
        encryption: encrypt,
      },
    ]);

    if (response.status !== 10000) {
      yield put(otpFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(otpFetchSuccess());
    }
  } catch (err) {
    yield put(otpFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* otpFetchWatch() {
  yield takeEvery(OTP.REQUEST, otpFetchWatchHandle);
}
