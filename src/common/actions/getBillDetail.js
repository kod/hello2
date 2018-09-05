import { GET_BILL_DETAIL } from '../constants/actionTypes';

export function getBillDetailFetchSuccess(params) {
  return {
    type: GET_BILL_DETAIL.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function getBillDetailFetchFailure() {
  return {
    type: GET_BILL_DETAIL.FAILURE,
    payload: {},
  };
}

export function getBillDetailFetch(params) {
  return {
    type: GET_BILL_DETAIL.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getBillDetailClear() {
  return {
    type: GET_BILL_DETAIL.CLEAR,
    payload: {},
  };
}
