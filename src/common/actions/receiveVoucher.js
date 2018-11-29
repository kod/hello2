import { RECEIVE_VOUCHER } from '../constants/actionTypes';

export function receiveVoucherFetchSuccess() {
  return {
    type: RECEIVE_VOUCHER.SUCCESS,
    payload: {},
  };
}

export function receiveVoucherFetchFailure() {
  return {
    type: RECEIVE_VOUCHER.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function receiveVoucherFetch(params) {
  return {
    type: RECEIVE_VOUCHER.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function receiveVoucherClear(user) {
  return {
    type: RECEIVE_VOUCHER.CLEAR,
    payload: {
      user,
    },
  };
}
