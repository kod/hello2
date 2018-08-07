import {
  ADD_DETAIL_INFO,
} from '../constants/actionTypes';

export function userAddDetailInfoFetchSuccess() {
  return {
    type: ADD_DETAIL_INFO.SUCCESS,
    payload: {
    },
  };
}

export function userAddDetailInfoFetchFailure() {
  return {
    type: ADD_DETAIL_INFO.FAILURE,
    payload: {
    },
  };
}

export function userAddDetailInfoFetch() {
  return {
    type: ADD_DETAIL_INFO.REQUEST,
    payload: {
    },
  };
}
