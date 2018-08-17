import { LOGIN, LOGOUT } from '../constants/actionTypes';

export function loginFetchSuccess(user, screen) {
  return {
    type: LOGIN.SUCCESS,
    payload: {
      user,
      screen,
    },
  };
}

export function loginFetchFailure() {
  return {
    type: LOGIN.FAILURE,
    payload: {},
  };
}

export function loginFetch({ msisdn, password, otp, screen }) {
  return {
    type: LOGIN.REQUEST,
    payload: {
      msisdn,
      password,
      otp,
      screen,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT.SUCCESS,
  };
}
