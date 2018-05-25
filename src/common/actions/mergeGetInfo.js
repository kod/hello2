import { MERGE_GETINFO } from '../constants/actionTypes';

export function mergeGetInfoFetchSuccess(items) {
  return {
    type: MERGE_GETINFO.SUCCESS,
    payload: {
      items,
    },
  };
}

export function mergeGetInfoFetchFailure() {
  return {
    type: MERGE_GETINFO.FAILURE,
    payload: {

    },
  };
}

export function mergeGetInfoFetch(params) {
  return {
    type: MERGE_GETINFO.REQUEST,
    payload: params,
  };
}

export function mergeGetInfoClear() {
  return {
    type: MERGE_GETINFO.CLEAR,
    payload: {
    },
  };
}
