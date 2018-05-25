import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { mergeGetMasterFetchSuccess, mergeGetMasterFetchFailure } from '../actions/mergeGetMaster';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETMASTER } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

// import { getAuthUserFunid, } from '../selectors';

export function* mergeGetMasterFetchWatchHandle(action) {
  try {
    const {
      brandId = 0,
      pagesize = 8,
      currentpage = 1,
    } = action.payload;
    // const funid = yield select(getAuthUserFunid);
    console.log(action.payload);
    
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.merge.master';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
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
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        brandid: brandId,
        pagesize: pagesize,
        currentpage: currentpage,
      }
    ]);

    console.log('kkkkkkkkkkkk');
    console.log(JSON.stringify(response));

    if (response.code !== 10000) {
      yield put(mergeGetMasterFetchFailure());
      yield put(addError(response.msg));
      return false;
    }
    console.log(response.details);
    yield put(mergeGetMasterFetchSuccess(response.details));
  } catch (err) {
    yield put(mergeGetMasterFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* mergeGetMasterFetchWatch() {
  yield takeEvery(MERGE_GETMASTER.REQUEST, mergeGetMasterFetchWatchHandle);
}