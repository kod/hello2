import { GET_SQUARES_INFO } from '../constants/actionTypes';

export function getSquaresInfoFetchSuccess() {
  return {
    type: GET_SQUARES_INFO.SUCCESS,
    payload: {},
  };
}

export function getSquaresInfoFetchFailure() {
  return {
    type: GET_SQUARES_INFO.FAILURE,
    payload: {},
  };
}

export function getSquaresInfoFetch() {
  return {
    type: GET_SQUARES_INFO.REQUEST,
    payload: {},
  };
}

export function getSquaresInfoClear() {
  return {
    type: GET_SQUARES_INFO.CLEAR,
    payload: {},
  };
}
