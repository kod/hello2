import { QUERY_GOODS } from '../constants/actionTypes';

export function queryGoodsFetchSuccess(params) {
  return {
    type: QUERY_GOODS.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function queryGoodsFetchFailure() {
  return {
    type: QUERY_GOODS.FAILURE,
    payload: {

    },
  };
}

export function queryGoodsFetch(
  params
) {
  return {
    type: QUERY_GOODS.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function queryGoodsClear() {
  return {
    type: QUERY_GOODS.CLEAR,
    payload: {
    },
  };
}
