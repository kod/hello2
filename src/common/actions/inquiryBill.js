import { INQUIRY_BILL } from '../constants/actionTypes';

export function inquiryBillFetchSuccess(items) {
  return {
    type: INQUIRY_BILL.SUCCESS,
    payload: {
      items,
    },
  };
}

export function inquiryBillFetchFailure() {
  return {
    type: INQUIRY_BILL.FAILURE,
    payload: {},
  };
}

export function inquiryBillFetch({
  orderNo,
  tradeNo,
  useraccount = '',
  notifyUrlBg = '',
}) {
  return {
    type: INQUIRY_BILL.REQUEST,
    payload: {
      orderNo,
      tradeNo,
      useraccount,
      notifyUrlBg,
    },
  };
}

export function inquiryBillClear() {
  return {
    type: INQUIRY_BILL.CLEAR,
    payload: {},
  };
}
