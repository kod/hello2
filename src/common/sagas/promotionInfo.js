import { takeEvery, apply, put } from 'redux-saga/effects';
import { promotionInfoFetchSuccess, promotionInfoFetchFailure } from '../actions/promotionInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PROMOTION_INFO } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';

export function* promotionInfoFetchWatchHandle(action) {
  try {
    let Key = 'commodityKey';
    console.log(Key);
    let appId = '';
    let method = 'fun.promotion.query';
    let charset = 'utf-8';
    let timestamp = (Date.now() + '').slice(3);
    let version = '2.0';


    let typeid = '0';
    let classfyid = '0';
    let position = '0';
    let pagesize = '6';
    let currentpage = '1';

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

    const response = yield apply(buyoo, buyoo.getPromotionInfo, [
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

    yield put(promotionInfoFetchSuccess(response));
  } catch (err) {
    yield put(promotionInfoFetchFailure());
    yield put(addError(err));
  }
}

export function* promotionInfoFetchWatch() {
  yield takeEvery(PROMOTION_INFO.REQUEST, promotionInfoFetchWatchHandle);
}
