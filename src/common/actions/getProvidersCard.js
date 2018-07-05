import {
  GET_PROVIDERS_CARD,
} from '../constants/actionTypes';

export function getProvidersCardFetchSuccess(items) {
  return {
    type: GET_PROVIDERS_CARD.SUCCESS,
    payload: {
      items
    },
  };
}

export function getProvidersCardFetchFailure() {
  return {
    type: GET_PROVIDERS_CARD.FAILURE,
    payload: {

    },
  };
}

export function getProvidersCardFetch(
  params
) {
  return {
    type: GET_PROVIDERS_CARD.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getProvidersCardClear() {
  return {
    type: GET_PROVIDERS_CARD.CLEAR,
    payload: {
    },
  };
}
