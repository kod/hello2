import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { mergeGetSlaveFetchSuccess, mergeGetSlaveFetchFailure } from '../actions/mergeGetSlave';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETSLAVE } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';


export function* mergeGetSlaveFetchWatchHandle(action) {
  try {
    const {
      brandId = 0,
      masterId = 0,
      pagesize = 10,
      currentpage = 1,
    } = action.payload;
    
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.merge.slave';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'brandid',
          value: brandId
        },
        {
          key: 'mergemasterid',
          value: masterId
        },
        {
          key: 'pagesize',
          value: pagesize
        },
        {
          key: 'currentpage',
          value: currentpage
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.mergeGetSlave, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        brandid: brandId,
        mergemasterid: masterId,
        pagesize: pagesize,
        currentpage: currentpage
      }
    ]);

    if (response.code !== 10000) {
      yield put(mergeGetSlaveFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(mergeGetSlaveFetchSuccess(response));
  } catch (err) {
    yield put(mergeGetSlaveFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetSlaveFetchWatch() {
  yield takeEvery(MERGE_GETSLAVE.REQUEST, mergeGetSlaveFetchWatchHandle);
}
