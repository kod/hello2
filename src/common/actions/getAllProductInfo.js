import { GET_ALL_PRODUCT_INFO } from '../constants/actionTypes';

export function getAllProductInfoFetchSuccess(items) {
  return {
    type: GET_ALL_PRODUCT_INFO.SUCCESS,
    payload: {
      items,
    },
  };
}

export function getAllProductInfoFetchFailure() {
  return {
    type: GET_ALL_PRODUCT_INFO.FAILURE,
    payload: {

    },
  };
}

export function getAllProductInfoFetch(
  params,
) {
  return {
    type: GET_ALL_PRODUCT_INFO.REQUEST,
    payload: {
      ...params,
    },
  };
}

export function getAllProductInfoClear() {
  return {
    type: GET_ALL_PRODUCT_INFO.CLEAR,
    payload: {
    },
  };
}
