import { AD_DIGITAL } from '../constants/actionTypes';

export function adDigitalFetchSuccess(adDigitalList, adDigitalBanerList, classfyinfo) {
  return {
    type: AD_DIGITAL.SUCCESS,
    payload: {
      adDigitalList,
      adDigitalBanerList,
      classfyinfo,
    },
  };
}

export function adDigitalFetchFailure() {
  return {
    type: AD_DIGITAL.FAILURE,
    payload: {

    },
  };
}

export function adDigitalFetch(
  refreshing = false,
) {
  return {
    type: AD_DIGITAL.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function adDigitalClear() {
  return {
    type: AD_DIGITAL.CLEAR,
    payload: {
    },
  };
}
