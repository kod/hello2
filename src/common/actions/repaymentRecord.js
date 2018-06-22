import { REPAYMENT_RECORD } from '../constants/actionTypes';

export function repaymentRecordFetchSuccess(params) {
  return {
    type: REPAYMENT_RECORD.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function repaymentRecordFetchFailure() {
  return {
    type: REPAYMENT_RECORD.FAILURE,
    payload: {

    },
  };
}

export function repaymentRecordFetch(
  params
) {
  return {
    type: REPAYMENT_RECORD.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function repaymentRecordClear() {
  return {
    type: REPAYMENT_RECORD.CLEAR,
    payload: {
    },
  };
}
