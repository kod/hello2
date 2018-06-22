import { BILL_DETAILS } from '../constants/actionTypes';

export function billDetailsFetchSuccess(params) {
  return {
    type: BILL_DETAILS.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function billDetailsFetchFailure() {
  return {
    type: BILL_DETAILS.FAILURE,
    payload: {

    },
  };
}

export function billDetailsFetch(
  params
) {
  return {
    type: BILL_DETAILS.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function billDetailsClear() {
  return {
    type: BILL_DETAILS.CLEAR,
    payload: {
    },
  };
}
