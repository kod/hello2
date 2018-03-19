import { PROMOTION_INFO } from '../constants/actionTypes';

export function promotionInfoFetchSuccess(items) {
  return {
    type: PROMOTION_INFO.SUCCESS,
    payload: {
      items,
    },
  };
}

export function promotionInfoFetchFailure() {
  return {
    type: PROMOTION_INFO.FAILURE,
    payload: {

    },
  };
}

export function promotionInfoFetch(
  refreshing = false,
) {
  return {
    type: PROMOTION_INFO.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function promotionInfoClear() {
  return {
    type: PROMOTION_INFO.CLEAR,
    payload: {
    },
  };
}
