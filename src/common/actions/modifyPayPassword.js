import {
  MODIFYPAYPASSWORD,
} from '../constants/actionTypes';

export function modifyPayPasswordFetchSuccess(from) {
  return {
    type: MODIFYPAYPASSWORD.SUCCESS,
    payload: {
      from
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

export function modifyPayPasswordFetch(msisdn, paypassword, otp, from) {
  return {
    type: MODIFYPAYPASSWORD.REQUEST,
    payload: {
      msisdn,
      paypassword,
      otp,
      from,
    },
  };
}
