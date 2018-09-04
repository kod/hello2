import { SEARCH_MONTH_DETAIL } from '../constants/actionTypes';

export function searchMonthDetailFetchSuccess(params) {
  return {
    type: SEARCH_MONTH_DETAIL.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function searchMonthDetailFetchFailure() {
  return {
    type: SEARCH_MONTH_DETAIL.FAILURE,
    payload: {},
  };
}

export function searchMonthDetailFetch(params) {
  return {
    type: SEARCH_MONTH_DETAIL.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function searchMonthDetailClear() {
  return {
    type: SEARCH_MONTH_DETAIL.CLEAR,
    payload: {},
  };
}
