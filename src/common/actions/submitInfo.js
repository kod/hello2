import { SUBMIT_INFO } from '../constants/actionTypes';

export function submitInfoFetchSuccess() {
  return {
    type: SUBMIT_INFO.SUCCESS,
    payload: {},
  };
}

export function submitInfoFetchFailure() {
  return {
    type: SUBMIT_INFO.FAILURE,
    payload: {},
  };
}

export function submitInfoFetch({
  identification = '',
  studentcard = '',
  personalphotos = '',
  tuitionreceipt = '',
  instructions = '',
  imageurl = '',
  memo = '',
}) {
  return {
    type: SUBMIT_INFO.REQUEST,
    payload: {
      identification,
      studentcard,
      personalphotos,
      tuitionreceipt,
      instructions,
      imageurl,
      memo,
    },
  };
}

export function submitInfoClear() {
  return {
    type: SUBMIT_INFO.CLEAR,
    payload: {},
  };
}
