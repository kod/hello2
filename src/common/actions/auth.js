import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  AUTH_REFRESH_ACCESS_TOKEN,
  AUTH_REHYDRATE,
} from '../constants/actionTypes';

export function rehydrateSuccess() {
  return {
    type: AUTH_REHYDRATE.SUCCESS
  };
}
