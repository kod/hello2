import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { mergeGetMasterFetchSuccess, mergeGetMasterFetchFailure } from '../actions/mergeGetMaster';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETMASTER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

// import { getAuthUserFunid, } from '../selectors';

export function* mergeGetMasterFetchWatchHandle(action) {
  try {
    const {
      brandId = 0,
      pagesize = 8,
      currentpage = 1,
    } = action.payload;
    // const funid = yield select(getAuthUserFunid);
    
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.merge.master';
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
          key: 'pagesize',
          value: pagesize
        },
        {
          key: 'currentpage',
          value: currentpage
        },
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.mergeGetMaster, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        brandid: brandId,
        pagesize: pagesize,
        currentpage: currentpage,
      }
    ]);

    if (response.code !== 10000) {
      yield put(mergeGetMasterFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }
    yield put(mergeGetMasterFetchSuccess(response.details));
  } catch (err) {
    yield put(mergeGetMasterFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetMasterFetchWatch() {
  yield takeEvery(MERGE_GETMASTER.REQUEST, mergeGetMasterFetchWatchHandle);
}
