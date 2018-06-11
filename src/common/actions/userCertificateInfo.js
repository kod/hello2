import {
  USER_CERTIFICATE_INFO,
  ADD_DETAIL_INFO,
} from "../constants/actionTypes";

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

export function userCertificateInfoFetch(user, type = 'userCertificateInfo') {
  return {
    type: USER_CERTIFICATE_INFO.REQUEST,
    payload: {
      user,
      type,
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

export function userAddDetailInfoFetchSuccess() {
  return {
    type: ADD_DETAIL_INFO.SUCCESS,
    payload: {
    },
  };
}

export function userAddDetailInfoFetchFailure() {
  return {
    type: ADD_DETAIL_INFO.FAILURE,
    payload: {
    },
  };
}

export function userAddDetailInfoFetch() {
  return {
    type: ADD_DETAIL_INFO.REQUEST,
    payload: {
    },
  };
}
