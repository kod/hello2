import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import { commentFetchSuccess, commentFetchFailure } from '../actions/comment';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { COMMENT } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* commentFetchWatchHandle(action) {
  try {
    const { brandId } = action.payload;

    const msisdn = '';
    const pagesize = '4';
    const currentpage = '1';

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.evaluation.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'brand_id',
          value: brandId,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentPage',
          value: currentpage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getEvaluationInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        brand_id: brandId,
        msisdn,
        pagesize,
        currentPage: currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(commentFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      const responseEdited = {
        ...response,
        detail: response.detail.map(val => {
          val.imageUrls = val.imageUrls === '' ? [] : val.imageUrls.split('|');
          val.updateTime = val.updateTime.slice(0, 10);
          return val;
        }),
      };
      yield put(commentFetchSuccess(responseEdited));
    }
  } catch (err) {
    yield put(commentFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* commentFetchWatch() {
  yield takeEvery(COMMENT.REQUEST, commentFetchWatchHandle);
}
