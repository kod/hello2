import { REGISTER } from '../constants/actionTypes';

export function registerFetchSuccess() {
  return {
    type: REGISTER.SUCCESS,
    payload: {},
  };
}

export function registerFetchFailure() {
  return {
    type: REGISTER.FAILURE,
    payload: {},
  };
}

export function registerFetch(params) {
  return {
    type: REGISTER.REQUEST,
    payload: {
      ...params,
    },
  };
}
