import { LOGIN, LOGOUT } from '../constants/actionTypes';

export function loginFetchSuccess(user) {
  return {
    type: LOGIN.SUCCESS,
    payload: {
      user,
    },
  };
}

export function loginFetchFailure() {
  return {
    type: LOGIN.FAILURE,
    payload: {},
  };
}

export function loginFetch(msisdn, password) {
  return {
    type: LOGIN.REQUEST,
    payload: {
      msisdn,
      password,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT.SUCCESS,
  };
}
