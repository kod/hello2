import { MODIFYPAYPASSWORD } from '../constants/actionTypes';

export function modifyPayPasswordFetchClear() {
  return {
    type: MODIFYPAYPASSWORD.CLEAR,
    payload: {},
  };
}

export function modifyPayPasswordFetchSuccess() {
  return {
    type: MODIFYPAYPASSWORD.SUCCESS,
    payload: {},
  };
}

export function modifyPayPasswordFetchFailure() {
  return {
    type: MODIFYPAYPASSWORD.FAILURE,
    payload: {},
  };
}

export function modifyPayPasswordFetch(paypassword, otp) {
  return {
    type: MODIFYPAYPASSWORD.REQUEST,
    payload: {
      paypassword,
      otp,
    },
  };
}
