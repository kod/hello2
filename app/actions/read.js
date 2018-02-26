import * as types from '../constants/ActionTypes';

export function requestAdverstList() {
  return {
    type: types.REQUEST_ADVERS_LIST,
  };
}

export function fetchAdverstList() {
  return {
    type: types.FETCH_ADVERST_LIST,
  };
}

export function requestArticleList(
  isRefreshing,
  loading,
  typeId,
  isLoadMore,
  page = 1
) {
  return {
    type: types.REQUEST_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore,
    typeId,
    page
  };
}

export function fetchArticleList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

export function receiveArticleList(articleList, typeId) {
  return {
    type: types.RECEIVE_ARTICLE_LIST,
    articleList,
    typeId
  };
}
