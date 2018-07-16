import { MERGE_GETINFO } from '../constants/actionTypes';

export function mergeGetInfoFetchSuccess(items, currentpage) {
  return {
    type: MERGE_GETINFO.SUCCESS,
    payload: {
      items,
      currentpage
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
