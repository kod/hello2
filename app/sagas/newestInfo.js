import { put, take, call, fork, apply } from "redux-saga/effects";

import * as types from "../constants/ActionTypes";
import ToastUtil from "../utils/ToastUtil";
import { fetchNewestInfo, receiveNewestInfo, } from "../actions/newestInfo";
import apiClient from "../components/apiClient";

export function* requestAdverstList(isRefreshing, loading, typeId, isLoadMore, page) {
  try {
    yield put(fetchNewestInfo(isRefreshing, loading, isLoadMore));
    const articleList = yield apply(apiClient, apiClient.getNewestInfo, [{
      appId: "",
      charset: "UTF-8",
      classfy_id: "0",
      currentPage: "1",
      encrypt: "78badee7d1d29269b9afb5389aee6d11",
      signType: "232d3721d7461bdfc771ce28408ce7c9",
      method: "fun.newest.query",
      pagesize: "5",
      position: "1",
      timestamp: "2017-09-06 11:30:50",
      type_id: "0",
      version: "1.0"
    }]);
    console.log(articleList);
    yield put(receiveAdverstList(
      articleList.showapi_res_body.pagebean.contentlist,
      typeId
    ));
    const errorMessage = articleList.showapi_res_error;
    if (errorMessage && errorMessage !== '') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveNewestInfo([], typeId));
    ToastUtil.showShort("网络发生错误，请重试");
  }
}

export function* watchRequestAdverstList() {
  while (true) {
    const { isRefreshing, loading, typeId, isLoadMore, page } = yield take(types.REQUEST_ADVERST_LIST);
    yield fork(requestAdverstList, isRefreshing, loading, typeId, isLoadMore, page);
  }
}
