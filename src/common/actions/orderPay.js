import { ORDER_PAY } from '../constants/actionTypes';

export function orderPayFetchSuccess({ tradeNo, orderNo }) {
  return {
    type: ORDER_PAY.SUCCESS,
    payload: {
      tradeNo,
      orderNo,
    },
  };
}

export function orderPayFetchFailure() {
  return {
    type: ORDER_PAY.FAILURE,
    payload: {

    },
  };
}

export function orderPayFetch(
  params
) {
  return {
    type: ORDER_PAY.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function orderPayClear() {
  return {
    type: ORDER_PAY.CLEAR,
    payload: {
    },
  };
}
