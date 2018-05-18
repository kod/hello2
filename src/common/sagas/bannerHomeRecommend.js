import { takeEvery, apply, put } from 'redux-saga/effects';
import {
  bannerHomeRecommendFetchSuccess,
  bannerHomeRecommendFetchFailure,
} from '../actions/bannerHomeRecommend';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BANNER_HOME_RECOMMEND } from '../constants/actionTypes';

export function* bannerHomeRecommendFetchWatchHandle(action) {
  try {
    let response = [];

    let item = yield apply(buyoo, buyoo.getAdverstInfo, [{
      appId: "110",
      charset: "utf-8",
      classfy_id: "0",
      currentPage: "1",
      encrypt: "5c8c8e8cf994df3e121d8ec49374727e",
      signType: "2032a9f6733d8d7c9a53a63078314714",
      method: "fun.adverst.query",
      pagesize: "3",
      position: "3",
      timestamp: "2017-09-06 11:30:50",
      type_id: "1",
      version: "1.0"
    }]);
    response.push(item.details[0]);
    response.push(item.details[1]);
    response.push(item.details[2]);
    
    item = yield apply(buyoo, buyoo.getAdverstInfo, [{
      appId: "110",
      charset: "utf-8",
      classfy_id: "0",
      currentPage: "1",
      encrypt: "3a01f74e209a16344471e8c3f533aeb4",
      signType: "2032a9f6733d8d7c9a53a63078314714",
      method: "fun.adverst.query",
      pagesize: "3",
      position: "3",
      timestamp: "2017-09-06 11:30:50",
      type_id: "2",
      version: "1.0"
    }]);
    response.push(item.details[0]);
    response.push(item.details[1]);
    response.push(item.details[2]);

    item = yield apply(buyoo, buyoo.getAdverstInfo, [{
      appId: "110",
      charset: "utf-8",
      classfy_id: "0",
      currentPage: "1",
      encrypt: "d26e7855ae2dfe2b6584f058baead679",
      signType: "2032a9f6733d8d7c9a53a63078314714",
      method: "fun.adverst.query",
      pagesize: "3",
      position: "3",
      timestamp: "2017-09-06 11:30:50",
      type_id: "5",
      version: "1.0"
    }]);
    response.push(item.details[0]);
    response.push(item.details[1]);
    response.push(item.details[2]);

    yield put(
      bannerHomeRecommendFetchSuccess(
        response
      ),
    );
  } catch (err) {
    yield put(bannerHomeRecommendFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* bannerHomeRecommendFetchWatch() {
  yield takeEvery(BANNER_HOME_RECOMMEND.REQUEST, bannerHomeRecommendFetchWatchHandle);
}