import { GET_IMG_URL } from '../constants/actionTypes';

export function getImgUrlFetchSuccess(urls) {
  return {
    type: GET_IMG_URL.SUCCESS,
    payload: {
      urls,
    },
  };
}

export function getImgUrlFetchFailure() {
  return {
    type: GET_IMG_URL.FAILURE,
    payload: {},
  };
}

export function getImgUrlFetch(urls) {
  return {
    type: GET_IMG_URL.REQUEST,
    payload: {
      urls,
    },
  };
}

export function getImgUrlClear() {
  return {
    type: GET_IMG_URL.CLEAR,
    payload: {},
  };
}
