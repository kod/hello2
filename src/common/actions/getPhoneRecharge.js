import {
  GET_PHONE_RECHARGE,
} from '../constants/actionTypes';

export function getPhoneRechargeFetchSuccess(params) {
  return {
    type: GET_PHONE_RECHARGE.SUCCESS,
    payload: {
      ...params
    },
  };
}

export function getPhoneRechargeFetchFailure() {
  return {
    type: GET_PHONE_RECHARGE.FAILURE,
    payload: {

    },
  };
}

export function getPhoneRechargeFetch(
  params
) {
  return {
    type: GET_PHONE_RECHARGE.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getPhoneRechargeClear() {
  return {
    type: GET_PHONE_RECHARGE.CLEAR,
    payload: {
    },
  };
}
