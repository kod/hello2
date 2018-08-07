import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { commentFetchSuccess, commentFetchFailure } from '../actions/comment';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { COMMENT } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from "moment";


export function* commentFetchWatchHandle(action) {
  try {
    const {
      brand_id,
    } = action.payload;
  
    let msisdn = '';
    let pagesize = '4';
    let currentpage = '1';

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.evaluation.query';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '1.0';
  
    let signType = signTypeMD5(appId, method, charset, Key, false);

    let encrypt = encryptMD5(
      [
        {
          key: 'brand_id',
          value: brand_id
        },
        {
          key: 'msisdn',
          value: msisdn
        },
        {
          key: 'pagesize',
          value: pagesize
        },
        {
          key: 'currentPage',
          value: currentpage
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.getEvaluationInfo, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        brand_id: brand_id,
        msisdn: msisdn,
        pagesize: pagesize,
        currentPage: currentpage
      }
    ]);

    if (response.code !== 10000) {
      yield put(commentFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    const responseEdited = {
      ...response,
      detail: response.detail.map((val, key) => {
        val.imageUrls = val.imageUrls.split('|');
        val.updateTime = val.updateTime.slice(0, 10);
        return val;
      }),
    }

    yield put(commentFetchSuccess(responseEdited));
  } catch (err) {
    yield put(commentFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* commentFetchWatch() {
  yield takeEvery(COMMENT.REQUEST, commentFetchWatchHandle);
}
