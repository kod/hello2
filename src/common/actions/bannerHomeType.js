import { BANNER_HOME_TYPE } from '../constants/actionTypes';

export function bannerHomeTypeFetchSuccess(items) {
  return {
    type: BANNER_HOME_TYPE.SUCCESS,
    payload: {
      items,
    },
  };
}

export function bannerHomeTypeFetchFailure() {
  return {
    type: BANNER_HOME_TYPE.FAILURE,
    payload: {

    },
  };
}

export function bannerHomeTypeFetch(
  refreshing = false,
) {
  return {
    type: BANNER_HOME_TYPE.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function bannerHomeTypeClear() {
  return {
    type: BANNER_HOME_TYPE.CLEAR,
    payload: {
    },
  };
}
