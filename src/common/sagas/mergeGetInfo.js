import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { mergeGetInfoFetchSuccess, mergeGetInfoFetchFailure } from '../actions/mergeGetInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETINFO } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";


export function* mergeGetInfoFetchWatchHandle(action) {
  try {
    const {
      typeid = 0,
      classfyid = 0,
      position = 0,
      pagesize = 4,
      currentpage = 1,
    } = action.payload;
    
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.merge.query';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'typeid',
          value: typeid
        },
        {
          key: 'classfyid',
          value: classfyid
        },
        {
          key: 'position',
          value: position
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

    const response = yield apply(buyoo, buyoo.mergeGetInfo, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        typeid: typeid,
        classfyid: classfyid,
        position: position,
        pagesize: pagesize,
        currentpage: currentpage
      }
    ]);

    let result = [];
    
    if (response.code !== 10000) {
      yield put(mergeGetInfoFetchFailure());
      yield put(addError(response.msg));  
      return false;
    }

    const array = response.details;
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      element.price = element.mergePrice;
      result.push(element);
    }

    yield put(mergeGetInfoFetchSuccess(result));
  } catch (err) {
    yield put(mergeGetInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetInfoFetchWatch() {
  yield takeEvery(MERGE_GETINFO.REQUEST, mergeGetInfoFetchWatchHandle);
}
