import { Platform, ToastAndroid, } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  getUserInfoByIdFetch,
  getUserInfoByIdFetchSuccess,
  getUserInfoByIdFetchFailure,
} from '../actions/getUserInfoById';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import {
  GET_USERINFO_BYID,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import { getAuthUserFunid } from '../selectors';

export function* getUserInfoByIdFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    
    const Key = 'userKey';
    const provider = Platform.OS === 'ios' ? '1' : '2';
  
    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider
        },
        {
          key: 'id',
          value: funid
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.getUserInfoById, [
      {
        provider: provider,
        id: funid,
        encryption: encrypt
      }
    ]);

    if (response.status !== 10000) {
      yield put(getUserInfoByIdFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(getUserInfoByIdFetchSuccess(response.details));
  } catch (err) {
    yield put(getUserInfoByIdFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* getUserInfoByIdFetchWatch() {
  yield takeEvery(GET_USERINFO_BYID.REQUEST, getUserInfoByIdFetchWatchHandle);
}
