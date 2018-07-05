import {
  GET_PROVIDERS_VALUE,
} from '../constants/actionTypes';

export function getProvidersValueFetchSuccess(params) {
  return {
    type: GET_PROVIDERS_VALUE.SUCCESS,
    payload: {
      ...params,
    },
  };
}

export function getProvidersValueFetchFailure() {
  return {
    type: GET_PROVIDERS_VALUE.FAILURE,
    payload: {

    },
  };
}

export function getProvidersValueFetch(
  params
) {
  return {
    type: GET_PROVIDERS_VALUE.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getProvidersValueClear() {
  return {
    type: GET_PROVIDERS_VALUE.CLEAR,
    payload: {
    },
  };
}
