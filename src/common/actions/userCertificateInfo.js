import { USER_CERTIFICATE_INFO } from "../constants/actionTypes";

export function userCertificateInfoFetchSuccess(certUser) {
  return {
    type: USER_CERTIFICATE_INFO.SUCCESS,
    payload: {
      certUser,
    },
  };
}

export function userCertificateInfoFetchFailure() {
  return {
    type: USER_CERTIFICATE_INFO.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function userCertificateInfoFetch(user) {
  return {
    type: USER_CERTIFICATE_INFO.REQUEST,
    payload: {
      user,
    },
  };
}

export function userCertificateInfoClear(user) {
  return {
    type: USER_CERTIFICATE_INFO.CLEAR,
    payload: {
      user,
    },
  };
}
