import { MERGE_GETMASTER } from '../constants/actionTypes';

export function mergeGetMasterFetchSuccess(items) {
  return {
    type: MERGE_GETMASTER.SUCCESS,
    payload: {
      items,
    },
  };
}

export function mergeGetMasterFetchFailure() {
  return {
    type: MERGE_GETMASTER.FAILURE,
    payload: {

    },
  };
}

export function mergeGetMasterFetch(params) {
  return {
    type: MERGE_GETMASTER.REQUEST,
    payload: params,
  };
}

export function mergeGetMasterClear() {
  return {
    type: MERGE_GETMASTER.CLEAR,
    payload: {
    },
  };
}
