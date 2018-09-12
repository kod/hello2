import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  getImgUrlFetchSuccess,
  getImgUrlFetchFailure,
} from '../actions/getImgUrl';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_IMG_URL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* getImgUrlFetchWatchHandle(action) {
  try {
    const { urls = '' } = action.payload;

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.usercenter.getImgUrl';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'urls',
          value: urls,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getImgUrl, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        urls,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getImgUrlFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getImgUrlFetchSuccess(response.urls));
    }
  } catch (err) {
    yield put(getImgUrlFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getImgUrlFetchWatch() {
  yield takeEvery(GET_IMG_URL.REQUEST, getImgUrlFetchWatchHandle);
}
