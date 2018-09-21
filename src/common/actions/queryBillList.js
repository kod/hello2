import { QUERY_BILL_LIST } from '../constants/actionTypes';

export function queryBillListFetchSuccess(items, period) {
  return {
    type: QUERY_BILL_LIST.SUCCESS,
    payload: {
      items,
      period,
    },
  };
}

export function queryBillListFetchFailure() {
  return {
    type: QUERY_BILL_LIST.FAILURE,
    payload: {},
  };
}

export function queryBillListFetch({ page = 1, rows = 100, period = 1 }) {
  return {
    type: QUERY_BILL_LIST.REQUEST,
    payload: {
      page,
      rows,
      period,
    },
  };
}

export function queryBillListClear() {
  return {
    type: QUERY_BILL_LIST.CLEAR,
    payload: {},
  };
}
