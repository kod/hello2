import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  promotionInfoFetchSuccess,
  promotionInfoFetchFailure,
} from '../actions/promotionInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PROMOTION_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* promotionInfoFetchWatchHandle() {
  try {
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.promotion.query';
    const charset = 'utf-8';
    const timestamp = `${Date.now()}`.slice(3);
    const version = '2.0';

    const typeid = '0';
    const classfyid = '0';
    const position = '0';
    const pagesize = '6';
    const currentpage = '1';

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

    const response = yield apply(buyoo, buyoo.getPromotionInfo, [
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

    yield put(promotionInfoFetchSuccess(response));
  } catch (err) {
    yield put(promotionInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* promotionInfoFetchWatch() {
  yield takeEvery(PROMOTION_INFO.REQUEST, promotionInfoFetchWatchHandle);
}
