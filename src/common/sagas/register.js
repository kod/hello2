import { Platform, ToastAndroid, Alert, } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  registerFetch,
  registerFetchSuccess,
  registerFetchFailure,
} from '../actions/register';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import {
  REGISTER,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

import NavigatorService from '../../navigations/NavigatorService';

import { SCREENS } from "../constants";

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
  
    const encrypt = encrypt_MD5(
      [
        {
          key: 'provider',
          value: provider
        },
        {
          key: 'msisdn',
          value: msisdn
        },
        {
          key: 'username',
          value: username
        },
        {
          key: 'password',
          value: password
        },
        {
          key: 'payPassword',
          value: payPassword
        },
        {
          key: 'otp',
          value: otp
        },
        {
          key: 'check',
          value: check
        },
        {
          key: 'appid',
          value: appid
        },
        {
          key: 'inviterno',
          value: inviterno
        },
      ],
      Key
    );
    
    let response = yield apply(buyoo, buyoo.register, [
      {
        provider: provider,
        msisdn: msisdn,
        username: username,
        password: password,
        payPassword: payPassword,
        otp: otp,
        check: check,
        appid: appid,
        inviterno: inviterno,
        encryption: encrypt,
        version: version,
      }
    ]);

    if (response.status !== 10000) {
      yield put(registerFetchFailure());
      yield put(addError(response.msg));
      return false;
    }
    yield put(registerFetchSuccess());

  } catch (err) {
    yield put(registerFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* registerFetchWatch() {
  yield takeEvery(REGISTER.REQUEST, registerFetchWatchHandle);
}

export function* registerSuccessWatchHandle(action) {
  try {
    const {
      from,
    } = action.payload;
    Alert.alert(
      '',
      '注册成功',
      [
        {
          text: i18n.confirm,
          onPress: () => {
            NavigatorService.pop(2);
          },
        }
      ]
    )

  } catch (error) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* registerSuccessWatch() {
  yield takeEvery(REGISTER.SUCCESS, registerSuccessWatchHandle);
}