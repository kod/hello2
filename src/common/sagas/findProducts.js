import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  findProductsFetchSuccess,
  findProductsFetchFailure,
} from '../actions/findProducts';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { FIND_PRODUCTS } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid, getAuthUser } from '../selectors';

export function* findProductsFetchWatchHandle(action) {
  try {
    const authUser = yield select(getAuthUser) || '';
    const funid = authUser ? yield select(getAuthUserFunid) : '';
    const { findcontent, pagesize = 50, currentpage = 1 } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.find.finding';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'findcontent',
          value: findcontent,
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

    const response = yield apply(buyoo, buyoo.findProducts, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        findcontent,
        pagesize,
        currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(findProductsFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        findProductsFetchSuccess(
          response.details.map(val => {
            val.imageUrl = val.iconUrl;
            return val;
          }),
        ),
      );
    }
  } catch (err) {
    yield put(findProductsFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* findProductsFetchWatch() {
  yield takeEvery(FIND_PRODUCTS.REQUEST, findProductsFetchWatchHandle);
}
