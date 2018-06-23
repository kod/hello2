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
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* schoolInfoFetchWatchHandle(action) {
  try {
    const name = '';
    const notifyurlbg = '';

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.getschoolinfo';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'name',
          value: name
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.getSchoolInfo, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        notifyurlbg: notifyurlbg,
        name: name,
      }
    ]);

    if (response.code !== 10000) {
      yield put(schoolInfoFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(schoolInfoFetchSuccess(response.details.filter((val) => val.staging !== 2)));
  } catch (err) {
    yield put(schoolInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* schoolInfoFetchWatch() {
  yield takeEvery(SCHOOL_INFOS.REQUEST, schoolInfoFetchWatchHandle);
}
