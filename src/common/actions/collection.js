import { COLLECTION } from '../constants/actionTypes';

export function collectionFetchSuccess(items) {
  return {
    type: COLLECTION.SUCCESS,
    payload: {
      items,
    },
  };
}

export function collectionFetchFailure() {
  return {
    type: COLLECTION.FAILURE,
    payload: {

    },
  };
}

export function collectionFetch(
  refreshing = false,
) {
  return {
    type: COLLECTION.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function collectionClear() {
  return {
    type: COLLECTION.CLEAR,
    payload: {
    },
  };
}
