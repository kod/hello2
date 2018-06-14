import { QUERY_ORDER_LIST } from '../constants/actionTypes';

export function queryOrderListFetchSuccess({ tradeNo, orderNo }) {
  return {
    type: QUERY_ORDER_LIST.SUCCESS,
    payload: {
      tradeNo,
      orderNo,
    },
  };
}

export function queryOrderListFetchFailure() {
  return {
    type: QUERY_ORDER_LIST.FAILURE,
    payload: {

    },
  };
}

export function queryOrderListFetch(
  params
) {
  return {
    type: QUERY_ORDER_LIST.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function queryOrderListClear() {
  return {
    type: QUERY_ORDER_LIST.CLEAR,
    payload: {
    },
  };
}
