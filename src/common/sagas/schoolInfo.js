import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  schoolInfoFetch,
  schoolInfoFetchSuccess,
  schoolInfoFetchFailure,
} from '../actions/schoolInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  SCHOOL_INFOS,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

export function* schoolInfoFetchWatchHandle(action) {
  try {
    const name = '';
    const notifyurlbg = '';

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.getschoolinfo';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';
  
    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'name',
          value: name
        },
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.getSchoolInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        notifyurlbg: notifyurlbg,
        name,
      }
    ]);

    if (response.code !== 10000) {
      yield put(schoolInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(schoolInfoFetchSuccess(response.details.filter(val => val.staging !== 2)));
  } catch (err) {
    yield put(schoolInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* schoolInfoFetchWatch() {
  yield takeEvery(SCHOOL_INFOS.REQUEST, schoolInfoFetchWatchHandle);
}
