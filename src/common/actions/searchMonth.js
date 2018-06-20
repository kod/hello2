import { SEARCH_MONTH } from '../constants/actionTypes';

export function searchMonthFetchSuccess(params) {
  return {
    type: SEARCH_MONTH.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function searchMonthFetchFailure() {
  return {
    type: SEARCH_MONTH.FAILURE,
    payload: {

    },
  };
}

export function searchMonthFetch(
  params
) {
  return {
    type: SEARCH_MONTH.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function searchMonthClear() {
  return {
    type: SEARCH_MONTH.CLEAR,
    payload: {
    },
  };
}
