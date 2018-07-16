import { MERGE_GATE } from '../constants/actionTypes';

export function mergeGateFetchSuccess(items) {
  return {
    type: MERGE_GATE.SUCCESS,
    payload: {
      items,
    },
  };
}

export function mergeGetInfoFetchFailure() {
  return {
    type: MERGE_GATE.FAILURE,
    payload: {

    },
  };
}

export function mergeGetInfoFetch(params) {
  return {
    type: MERGE_GATE.REQUEST,
    payload: params,
  };
}

export function mergeGetInfoClear() {
  return {
    type: MERGE_GATE.CLEAR,
    payload: {
    },
  };
}
