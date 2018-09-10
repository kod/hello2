import { CHECK_PAY_PASWORD } from '../constants/actionTypes';

export function checkPayPaswordFetchClear() {
  return {
    type: CHECK_PAY_PASWORD.CLEAR,
    payload: {},
  };
}

export function checkPayPaswordFetchSuccess(isCorrect) {
  return {
    type: CHECK_PAY_PASWORD.SUCCESS,
    payload: {
      isCorrect,
    },
  };
}

export function checkPayPaswordFetchFailure() {
  return {
    type: CHECK_PAY_PASWORD.FAILURE,
    payload: {},
  };
}

export function checkPayPaswordFetch(msisdn, paypassword) {
  return {
    type: CHECK_PAY_PASWORD.REQUEST,
    payload: {
      msisdn,
      paypassword,
    },
  };
}
