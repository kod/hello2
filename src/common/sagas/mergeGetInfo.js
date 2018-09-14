import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  mergeGetInfoFetchSuccess,
  mergeGateFetchFailure,
} from '../actions/mergeGetInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETINFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* mergeGetInfoFetchWatchHandle(action) {
  try {
    const {
      typeid = 0,
      classfyid = 0,
      position = 0,
      pagesize = 4,
      currentpage,
    } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.merge.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'typeid',
          value: typeid,
        },
        {
          key: 'classfyid',
          value: classfyid,
        },
        {
          key: 'position',
          value: position,
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

    const response = yield apply(buyoo, buyoo.mergeGetInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        typeid,
        classfyid,
        position,
        pagesize,
        currentpage,
      },
    ]);

    const result = [];

    if (response.code !== 10000) {
      yield put(mergeGateFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      const array = response.details;
      for (let index = 0; index < array.length; index += 1) {
        const element = array[index];
        element.price = element.mergePrice;
        result.push(element);
      }
      yield put(mergeGetInfoFetchSuccess(result, currentpage));
    }
  } catch (err) {
    yield put(mergeGateFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetInfoFetchWatch() {
  yield takeEvery(MERGE_GETINFO.REQUEST, mergeGetInfoFetchWatchHandle);
}
