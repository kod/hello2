import { MERGE_CHECK } from '../constants/actionTypes';

export function mergeCheckFetchSuccess(item) {
  return {
    type: MERGE_CHECK.SUCCESS,
    payload: {
      item,
    },
  };
}

export function mergeCheckFetchFailure() {
  return {
    type: MERGE_CHECK.FAILURE,
    payload: {

    },
  };
}

export function mergeCheckFetch(params) {
  return {
    type: MERGE_CHECK.REQUEST,
    payload: params,
  };
}

export function mergeCheckClear() {
  return {
    type: MERGE_CHECK.CLEAR,
    payload: {
    },
  };
}
