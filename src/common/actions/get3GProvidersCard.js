import {
  GET_3GPROVIDERS_CARD,
} from '../constants/actionTypes';

export function get3GProvidersCardFetchSuccess(items) {
  return {
    type: GET_3GPROVIDERS_CARD.SUCCESS,
    payload: {
      items
    },
  };
}

export function get3GProvidersCardFetchFailure() {
  return {
    type: GET_3GPROVIDERS_CARD.FAILURE,
    payload: {

    },
  };
}

export function get3GProvidersCardFetch(
  params
) {
  return {
    type: GET_3GPROVIDERS_CARD.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function get3GProvidersCardClear() {
  return {
    type: GET_3GPROVIDERS_CARD.CLEAR,
    payload: {
    },
  };
}
