import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';

import {
  // changePasswordFetch,
  changePasswordFetchSuccess,
  changePasswordFetchFailure,
} from '../actions/changePassword';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';

// import { SCREENS } from '../constants';
import { CHANGE_PASSWORD } from '../constants/actionTypes';
import { encryptMD5 } from '../../components/AuthEncrypt';

export function* changePasswordFetchWatchHandle(action) {
  const { msisdn, password, otp, screen } = action.payload;
  try {
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
          key: 'password',
          value: password,
        },
        {
          key: 'otp',
          value: otp,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.changePassword, [
      {
        provider,
        msisdn,
        password,
        otp,
        encryption: encrypt,
      },
    ]);

    if (response.status !== 10000) {
      yield put(changePasswordFetchFailure());
      switch (response.status) {
        case 70002:
          yield put(addError(i18n.verificationCodeIsIncorrect));
          return;

        default:
          yield put(addError('error'));
          break;
      }
    } else {
      yield put(changePasswordFetchSuccess(screen));
    }
  } catch (err) {
    yield put(changePasswordFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* changePasswordSuccessWatchHandle(action) {
  const { screen } = action.payload;
  try {
    yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [screen]);
  } catch (err) {
    console.warn(err);
  }
}

export function* changePasswordFetchWatch() {
  yield takeEvery(CHANGE_PASSWORD.REQUEST, changePasswordFetchWatchHandle);
}

export function* changePasswordSuccessWatch() {
  yield takeEvery(CHANGE_PASSWORD.SUCCESS, changePasswordSuccessWatchHandle);
}
