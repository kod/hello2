import { put, take, call, fork, apply } from "redux-saga/effects";

import * as types from "../constants/ActionTypes";
import ToastUtil from "../utils/ToastUtil";
import RequestUtil from "../utils/RequestUtil";
import { WEXIN_ARTICLE_LIST, GETADVERSTINFO } from "../constants/Urls";
import { fetchArticleList, receiveArticleList, fetchAdverstList, receiveAdverstList } from "../actions/read";
import apiClient from "../components/apiClient";

export function* requestAdverstList(isRefreshing, loading, typeId, isLoadMore, page) {
  try {
    // yield put(fetchAdverstList(isRefreshing, loading, isLoadMore));
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
    // const articleList = yield apply(apiClient, apiClient.getAdverstInfo, [{
    //   appId: 110,
    //   charset: "utf-8",
    //   classfy_id: 0,
    //   currentPage: 1,
    //   encrypt: "a03f98acb81ab1783a014c9c0f062098",
    //   method: "fun.adverst.query",
    //   pagesize: "5",
    //   position: "2",
    //   signType: "2032a9f6733d8d7c9a53a63078314714",
    //   timestamp: "2017-09-06+11:30:50",
    //   type_id: "1",
    //   version: "1.0"
    // }]);
    console.log(articleList);
    // yield put(receiveAdverstList(
    //   articleList.showapi_res_body.pagebean.contentlist,
    //   typeId
    // ));
    // const errorMessage = articleList.showapi_res_error;
    // if (errorMessage && errorMessage !== '') {
    //   yield ToastUtil.showShort(errorMessage);
    // }
  } catch (error) {
    // yield put(receiveAdverstList([], typeId));
    ToastUtil.showShort("网络发生错误，请重试");
  }
}

export function* requestArticleList(isRefreshing, loading, typeId, isLoadMore, page) {
  try {
    yield put(fetchArticleList(isRefreshing, loading, isLoadMore));
    const articleList = yield call(RequestUtil.request, `${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`, "get");
    yield put(receiveArticleList(articleList.showapi_res_body.pagebean.contentlist, typeId));
    const errorMessage = articleList.showapi_res_error;
    if (errorMessage && errorMessage !== "") {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveArticleList([], typeId));
    ToastUtil.showShort("网络发生错误，请重试");
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const { isRefreshing, loading, typeId, isLoadMore, page } = yield take(types.REQUEST_ARTICLE_LIST);
    yield fork(requestArticleList, isRefreshing, loading, typeId, isLoadMore, page);
  }
}

export function* watchRequestAdverstList() {
  while (true) {
    const { isRefreshing, loading, typeId, isLoadMore, page } = yield take(types.REQUEST_ADVERST_LIST);
    yield fork(requestAdverstList, isRefreshing, loading, typeId, isLoadMore, page);
  }
}
