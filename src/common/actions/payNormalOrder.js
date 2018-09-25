import { PAY_NORMAL_ORDER } from '../constants/actionTypes';

export function payNormalOrderFetchSuccess() {
  return {
    type: PAY_NORMAL_ORDER.SUCCESS,
    payload: {},
  };
}

export function payNormalOrderFetchFailure() {
  return {
    type: PAY_NORMAL_ORDER.FAILURE,
    payload: {},
  };
}

export function payNormalOrderFetch({
  orderNo,
  tradeNo,
  totalAmount,
  repaymentMonth,
  payway,
  paypassword,
}) {
  return {
    type: PAY_NORMAL_ORDER.REQUEST,
    payload: {
      orderNo,
      tradeNo,
      totalAmount,
      repaymentMonth,
      payway,
      paypassword,
    },
  };
}

export function payNormalOrderClear() {
  return {
    type: PAY_NORMAL_ORDER.CLEAR,
    payload: {},
  };
}
