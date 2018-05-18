import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { userCertificateInfoFetchSuccess, userCertificateInfoFetchFailure } from '../actions/userCertificateInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { USER_CERTIFICATE_INFO } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* userCertificateInfoFetchWatchHandle(action) {
  try {
    // const { user: { result } } = action.payload;
    const funid = action.payload.user.result;
    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.userviewdetail';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';

    const msisdn = '';

    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.userCertificateInfo, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        msisdn: msisdn,
      }
    ]);


    let result = {};

    if (response.code === 10000) {
      result = response;
    }

    yield put(userCertificateInfoFetchSuccess(result));
  } catch (err) {
    yield put(userCertificateInfoFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* userCertificateInfoFetchWatch() {
  yield takeEvery(USER_CERTIFICATE_INFO.REQUEST, userCertificateInfoFetchWatchHandle);
}
