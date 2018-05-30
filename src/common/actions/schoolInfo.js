import {
  SCHOOL_INFOS,
} from '../constants/actionTypes';

export function schoolInfoFetchSuccess(items) {
  return {
    type: SCHOOL_INFOS.SUCCESS,
    payload: {
      items,
    },
  };
}

export function schoolInfoFetchFailure() {
  return {
    type: SCHOOL_INFOS.FAILURE,
    payload: {

    },
  };
}

export function schoolInfoFetch() {
  return {
    type: SCHOOL_INFOS.REQUEST,
    payload: {},
  };
}
