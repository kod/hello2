import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  getAdverstTopInfoFetchSuccess,
  getAdverstTopInfoFetchFailure,
} from '../actions/getAdverstTopInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_ADVERST_TOP_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import { getAuthUserFunid, getAuthUser } from '../selectors';

export function* getAdverstTopInfoFetchWatchHandle() {
  try {
    const authUser = yield select(getAuthUser) || '';
    const funid = authUser ? yield select(getAuthUserFunid) : '';
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.adverst.top';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const pagesize = '14';
    const currentpage = '1';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getAdverstTopInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        pagesize,
        currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getAdverstTopInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getAdverstTopInfoFetchSuccess(response.result));
    }
  } catch (err) {
    // yield put(getAdverstTopInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getAdverstTopInfoFetchWatch() {
  yield takeEvery(
    GET_ADVERST_TOP_INFO.REQUEST,
    getAdverstTopInfoFetchWatchHandle,
  );
}
