import { AUDIT_GET_INFO } from '../constants/actionTypes';

export function auditGetInfoFetchSuccess({
  identification,
  studentCard,
  personalPhotos,
}) {
  return {
    type: AUDIT_GET_INFO.SUCCESS,
    payload: {
      identification,
      studentCard,
      personalPhotos,
    },
  };
}

export function auditGetInfoFetchFailure() {
  return {
    type: AUDIT_GET_INFO.FAILURE,
    payload: {},
  };
}

export function auditGetInfoFetch() {
  return {
    type: AUDIT_GET_INFO.REQUEST,
    payload: {},
  };
}

export function auditGetInfoClear() {
  return {
    type: AUDIT_GET_INFO.CLEAR,
    payload: {},
  };
}
