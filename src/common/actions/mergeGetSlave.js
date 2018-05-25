import { MERGE_GETSLAVE } from '../constants/actionTypes';

export function mergeGetSlaveFetchSuccess(items) {
  return {
    type: MERGE_GETSLAVE.SUCCESS,
    payload: {
      items,
    },
  };
}

export function mergeGetSlaveFetchFailure() {
  return {
    type: MERGE_GETSLAVE.FAILURE,
    payload: {

    },
  };
}

export function mergeGetSlaveFetch(params) {
  return {
    type: MERGE_GETSLAVE.REQUEST,
    payload: params,
  };
}

export function mergeGetSlaveClear() {
  return {
    type: MERGE_GETSLAVE.CLEAR,
    payload: {
    },
  };
}
