import {
  MODIFYPAYPASSWORD,
} from '../constants/actionTypes';

export function modifyPayPasswordFetchSuccess() {
  return {
    type: MODIFYPAYPASSWORD.SUCCESS,
    payload: {
    },
  };
}

export function modifyPayPasswordFetchFailure() {
  return {
    type: MODIFYPAYPASSWORD.FAILURE,
    payload: {

    },
  };
}

export function modifyPayPasswordFetch(msisdn, paypassword, otp) {
  return {
    type: MODIFYPAYPASSWORD.REQUEST,
    payload: {
      msisdn,
      paypassword,
      otp,
    },
  };
}
