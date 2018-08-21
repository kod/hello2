import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  bannerHomeTypeFetchSuccess,
  bannerHomeTypeFetchFailure,
} from '../actions/bannerHomeType';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BANNER_HOME_TYPE } from '../constants/actionTypes';

export function* bannerHomeTypeFetchWatchHandle() {
  try {
    const response = [];

    let item = yield apply(buyoo, buyoo.getAdverstInfo, [
      {
        appId: '110',
        charset: 'utf-8',
        classfy_id: '0',
        currentPage: '1',
        encrypt: 'f32010216f44f5c5eeb6484692896804',
        signType: '2032a9f6733d8d7c9a53a63078314714',
        method: 'fun.adverst.query',
        pagesize: '5',
        position: '1',
        timestamp: '2017-09-06 11:30:50',
        type_id: '1',
        version: '1.0',
      },
    ]);
    response.push(item.details[0]);
    // response.push(item.details[0].imageUrl);

    item = yield apply(buyoo, buyoo.getAdverstInfo, [
      {
        appId: '110',
        charset: 'utf-8',
        classfy_id: '0',
        currentPage: '1',
        encrypt: '0c29b31644576d1c2d272c4bb17f19eb',
        signType: '2032a9f6733d8d7c9a53a63078314714',
        method: 'fun.adverst.query',
        pagesize: '1',
        position: '1',
        timestamp: '2017-09-06 11:30:50',
        type_id: '2',
        version: '1.0',
      },
    ]);
    response.push(item.details[0]);
    // response.push(item.details[0].imageUrl);

    item = yield apply(buyoo, buyoo.getAdverstInfo, [
      {
        appId: '110',
        charset: 'utf-8',
        classfy_id: '0',
        currentPage: '1',
        encrypt: '23e0e8fc58b859e7fc157e00292d2faa',
        signType: '2032a9f6733d8d7c9a53a63078314714',
        method: 'fun.adverst.query',
        pagesize: '1',
        position: '1',
        timestamp: '2017-09-06 11:30:50',
        type_id: '5',
        version: '1.0',
      },
    ]);
    response.push(item.details[0]);
    // response.push(item.details[0].imageUrl);

    yield put(bannerHomeTypeFetchSuccess(response));
  } catch (err) {
    yield put(bannerHomeTypeFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* bannerHomeTypeFetchWatch() {
  yield takeEvery(BANNER_HOME_TYPE.REQUEST, bannerHomeTypeFetchWatchHandle);
}
