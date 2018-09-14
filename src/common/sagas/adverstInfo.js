import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  adverstInfoFetchSuccess,
  adverstInfoFetchFailure,
} from '../actions/adverstInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ADVERST_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* adverstInfoFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.adverst.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const typeId = params.type_id || '1';
    const classfyId = params.classfy_id || '0';
    const position = params.position || '3';
    const pagesize = params.pagesize || '3';
    const currentPage = params.currentPage || '1';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'type_id',
          value: typeId,
        },
        {
          key: 'classfy_id',
          value: classfyId,
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
          key: 'currentPage',
          value: currentPage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getAdverstInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        type_id: typeId,
        classfy_id: classfyId,
        position,
        pagesize,
        currentPage,
      },
    ]);

    const result = [];

    if (response.code === 10000) {
      const array = response.details;
      for (let index = 0; index < array.length; index += 1) {
        const element = array[index];
        element.price = element.minprice;
        element.orgPrice = element.maxprice;
        result.push(element);
      }
    } else {
      yield put(adverstInfoFetchSuccess(result));
    }
  } catch (err) {
    yield put(adverstInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* adverstInfoFetchWatch() {
  yield takeEvery(ADVERST_INFO.REQUEST, adverstInfoFetchWatchHandle);
}
