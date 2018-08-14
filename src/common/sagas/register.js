import { Platform, Alert } from 'react-native';
import {
  takeEvery,
  apply,
  put,
  // select,
} from 'redux-saga/effects';
import {
  // registerFetch,
  registerFetchSuccess,
  registerFetchFailure,
} from '../actions/register';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import {
  REGISTER,
  // REGISTER,
} from '../constants/actionTypes';
import { encryptMD5 } from '../../components/AuthEncrypt';

import NavigatorService from '../../navigations/NavigatorService';

export function* registerFetchWatchHandle(action) {
  try {
    const {
      msisdn,
      username = '',
      password,
      payPassword = '',
      otp,
      check = '1',
      appid = '',
      inviterno = '',
    } = action.payload;

    const Key = 'userKey';
    const provider = Platform.OS === 'ios' ? '1' : '2';
    const version = '2.1';

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
          key: 'username',
          value: username,
        },
        {
          key: 'password',
          value: password,
        },
        {
          key: 'payPassword',
          value: payPassword,
        },
        {
          key: 'otp',
          value: otp,
        },
        {
          key: 'check',
          value: check,
        },
        {
          key: 'appid',
          value: appid,
        },
        {
          key: 'inviterno',
          value: inviterno,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.register, [
      {
        provider,
        msisdn,
        username,
        password,
        payPassword,
        otp,
        check,
        appid,
        inviterno,
        encryption: encrypt,
        version,
      },
    ]);

    console.log(response);
    if (response.status !== 10000) {
      yield put(registerFetchFailure());
      switch (response.status) {
        case 50008:
          yield put(addError(i18n.phoneNumberAlreadyRegistered));
          break;

        default:
          yield put(addError(i18n.verificationCodeError));
          break;
      }
    } else {
      yield put(registerFetchSuccess());
    }
  } catch (err) {
    console.log(err);
    yield put(registerFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* registerFetchWatch() {
  yield takeEvery(REGISTER.REQUEST, registerFetchWatchHandle);
}

export function* registerSuccessWatchHandle(/* action */) {
  try {
    // const {
    //   from,
    // } = action.payload;

    Alert.alert('', '注册成功', [
      {
        text: i18n.confirm,
        onPress: () => {
          NavigatorService.pop(2);
        },
      },
    ]);
  } catch (error) {
    yield put(addError(typeof err === 'string' ? error : error.toString()));
  }
}

export function* registerSuccessWatch() {
  yield takeEvery(REGISTER.SUCCESS, registerSuccessWatchHandle);
}
