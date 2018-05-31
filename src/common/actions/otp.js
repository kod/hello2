import {
  OTP,
} from '../constants/actionTypes';

export function otpFetchSuccess() {
  return {
    type: OTP.SUCCESS,
    payload: {
    },
  };
}

export function otpFetchFailure() {
  return {
    type: OTP.FAILURE,
    payload: {

    },
  };
}

export function otpFetch(msisdn) {
  return {
    type: OTP.REQUEST,
    payload: {
      msisdn
    },
  };
}
