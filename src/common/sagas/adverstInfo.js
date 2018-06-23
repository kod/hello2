import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { adverstInfoFetchSuccess, adverstInfoFetchFailure } from '../actions/adverstInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ADVERST_INFO } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* adverstInfoFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.adverst.query';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';


    let type_id = params.type_id || '1';
    let classfy_id = params.classfy_id || '0';
    let position = params.position || '3';
    let pagesize = params.pagesize || '3';
    let currentPage = params.currentPage || '1';

    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'type_id',
          value: type_id
        },
        {
          key: 'classfy_id',
          value: classfy_id
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
          key: 'currentPage',
          value: currentPage
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.getAdverstInfo, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        type_id: type_id,
        classfy_id: classfy_id,
        position: position,
        pagesize: pagesize,
        currentPage: currentPage
      }
    ]);

    let result = [];

    if (response.code === 10000) {
      // result = response.details;

      const array = response.details;
      for (let index = 0; index < array.length; index++) {
        let element = array[index];
        element.price = element.minprice;
        element.orgPrice = element.maxprice;
        result.push(element);
      }

    }

    yield put(adverstInfoFetchSuccess(result));
  } catch (err) {
    yield put(adverstInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* adverstInfoFetchWatch() {
  yield takeEvery(ADVERST_INFO.REQUEST, adverstInfoFetchWatchHandle);
}
