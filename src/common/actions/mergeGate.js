import { MERGE_GATE } from '../constants/actionTypes';

export function mergeGateFetchSuccess(items) {
  return {
    type: MERGE_GATE.SUCCESS,
    payload: {
      items,
    },
  };
}

export function mergeGateFetchFailure() {
  return {
    type: MERGE_GATE.FAILURE,
    payload: {},
  };
}

export function mergeGateFetch(params) {
  return {
    type: MERGE_GATE.REQUEST,
    payload: params,
  };
}

export function mergeGateClear() {
  return {
    type: MERGE_GATE.CLEAR,
    payload: {},
  };
}
