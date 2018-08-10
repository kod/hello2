import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { promotionInfoFetchSuccess, promotionInfoFetchFailure } from '../actions/promotionInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PROMOTION_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* promotionInfoFetchWatchHandle(action) {
  try {
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.promotion.query';
    const charset = 'utf-8';
    const timestamp = (Date.now() + '').slice(3);
    const version = '2.0';


    let typeid = '0';
    let classfyid = '0';
    let position = '0';
    let pagesize = '6';
    let currentpage = '1';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
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

    const response = yield apply(buyoo, buyoo.getPromotionInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        typeid: typeid,
        classfyid: classfyid,
        position: position,
        pagesize: pagesize,
        currentpage: currentpage
      }
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
