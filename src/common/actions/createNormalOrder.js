import { CREATE_NORMAL_ORDER } from '../constants/actionTypes';

export function createNormalOrderFetchSuccess() {
  return {
    type: CREATE_NORMAL_ORDER.SUCCESS,
    payload: {},
  };
}

export function createNormalOrderFetchFailure() {
  return {
    type: CREATE_NORMAL_ORDER.FAILURE,
    payload: {},
  };
}

export function createNormalOrderFetch({
  orderNo,
  totalAmount,
  currency = '',
  subject = 'VND',
  repaymentMonth,
  goodsDetail,
  timeoutExpress = '3600',
  notifyUrlBg = '',
  orderNo1,
  tradeNo1,
}) {
  return {
    type: CREATE_NORMAL_ORDER.REQUEST,
    payload: {
      orderNo,
      totalAmount,
      currency,
      subject,
      repaymentMonth,
      goodsDetail,
      timeoutExpress,
      notifyUrlBg,
      orderNo1,
      tradeNo1,
    },
  };
}

export function createNormalOrderClear() {
  return {
    type: CREATE_NORMAL_ORDER.CLEAR,
    payload: {},
  };
}
