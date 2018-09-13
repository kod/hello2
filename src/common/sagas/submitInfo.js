import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  submitInfoFetchSuccess,
  submitInfoFetchFailure,
} from '../actions/submitInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { SUBMIT_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import { getAuthUserFunid } from '../selectors';

export function* submitInfoFetchWatchHandle(action) {
  const funid = yield select(getAuthUserFunid);
  try {
    const {
      identification,
      studentcard,
      personalphotos,
      tuitionreceipt,
      instructions,
      imageurl,
      memo,
    } = action.payload;

    const Key = 'riskKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.risk.submitAuditInfo';
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
          key: 'identification',
          value: identification,
        },
        {
          key: 'studentcard',
          value: studentcard,
        },
        {
          key: 'personalphotos',
          value: personalphotos,
        },
        {
          key: 'tuitionreceipt',
          value: tuitionreceipt,
        },
        {
          key: 'instructions',
          value: instructions,
        },
        {
          key: 'imageurl',
          value: imageurl,
        },
        {
          key: 'memo',
          value: memo,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.submitInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        identification,
        studentcard,
        personalphotos,
        tuitionreceipt,
        instructions,
        imageurl,
        memo,
      },
    ]);

    if (response.code !== 10000) {
      yield put(submitInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(submitInfoFetchSuccess());
    }
  } catch (err) {
    yield put(submitInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* submitInfoFetchWatch() {
  yield takeEvery(SUBMIT_INFO.REQUEST, submitInfoFetchWatchHandle);
}
