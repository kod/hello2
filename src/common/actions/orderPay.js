import { ORDER_PAY } from '../constants/actionTypes';

export function orderPayFetchSuccess({ ret, screen, payvalue }) {
  return {
    type: ORDER_PAY.SUCCESS,
    payload: {
      ret,
      screen,
      payvalue,
    },
  };
}

export function orderPayFetchFailure() {
  return {
    type: ORDER_PAY.FAILURE,
    payload: {},
  };
}

export function orderPayFetch(params) {
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
    payload: {},
  };
}
