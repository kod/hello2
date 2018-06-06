import { ORDER_CREATE } from '../constants/actionTypes';

export function orderCreateFetchSuccess({ tradeNo, orderNo }) {
  return {
    type: ORDER_CREATE.SUCCESS,
    payload: {
      tradeNo,
      orderNo,
    },
  };
}

export function orderCreateFetchFailure() {
  return {
    type: ORDER_CREATE.FAILURE,
    payload: {

    },
  };
}

export function orderCreateFetch(
  params
) {
  return {
    type: ORDER_CREATE.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function orderCreateClear() {
  return {
    type: ORDER_CREATE.CLEAR,
    payload: {
    },
  };
}
