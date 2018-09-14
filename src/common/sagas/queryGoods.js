import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  queryGoodsFetchSuccess,
  queryGoodsFetchFailure,
} from '../actions/queryGoods';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { QUERY_GOODS } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* queryGoodsFetchWatchHandle(action) {
  try {
    const { createtime } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.user.consume.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'createtime',
          value: createtime,
        },
      ],
      Key,
    );

    const options = [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        createtime,
      },
    ];

    const response = yield apply(buyoo, buyoo.queryGoods, options);

    if (response.code !== 10000) {
      yield put(queryGoodsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      let items = [];

      for (let index = 0; index < response.result.length; index += 1) {
        const element = response.result[index];
        items = [...items, ...element.goodList];
      }

      yield put(
        queryGoodsFetchSuccess({
          result: items,
        }),
      );
    }
  } catch (err) {
    yield put(queryGoodsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* queryGoodsFetchWatch() {
  yield takeEvery(QUERY_GOODS.REQUEST, queryGoodsFetchWatchHandle);
}
