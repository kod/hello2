import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { getAllProductInfoFetchSuccess, getAllProductInfoFetchFailure } from '../actions/getAllProductInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_ALL_PRODUCT_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

export function* getAllProductInfoFetchWatchHandle(action) {
  try {
    const {
      parent_id = '0',
      classfy_id = '0',
      sub_classfy_id = '0',
      third_classfy_id = '0',
      pagesize = 49,
      currentPage = 1,
    } = action.payload;
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.product.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'parent_id',
          value: parent_id
        },
        {
          key: 'classfy_id',
          value: classfy_id
        },
        {
          key: 'sub_classfy_id',
          value: sub_classfy_id
        },
        {
          key: 'third_classfy_id',
          value: third_classfy_id
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

    const response = yield apply(buyoo, buyoo.getAllProductInfo, [
      {
        appId: appId,
        method,
        charset,
        signType: signType,
        encrypt,
        timestamp,
        version,
        parent_id: parent_id,
        classfy_id: classfy_id,
        sub_classfy_id: sub_classfy_id,
        third_classfy_id: third_classfy_id,
        pagesize: pagesize,
        currentPage: currentPage
      }
    ]);

    if (response.code !== 10000) {
      yield put(getAllProductInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(getAllProductInfoFetchSuccess(
      response.details.map((val, key) => {
        val.imageUrl = val.iconUrl;
        return val;
      }))
    );
  } catch (err) {
    yield put(getAllProductInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getAllProductInfoFetchWatch() {
  yield takeEvery(GET_ALL_PRODUCT_INFO.REQUEST, getAllProductInfoFetchWatchHandle);
}
