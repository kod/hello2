import { BILL_BY_YEAR } from '../constants/actionTypes';

export function billByYearFetchSuccess(params) {
  return {
    type: BILL_BY_YEAR.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function billByYearFetchFailure() {
  return {
    type: BILL_BY_YEAR.FAILURE,
    payload: {

    },
  };
}

export function billByYearFetch(
  params
) {
  return {
    type: BILL_BY_YEAR.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function billByYearClear() {
  return {
    type: BILL_BY_YEAR.CLEAR,
    payload: {
    },
  };
}
