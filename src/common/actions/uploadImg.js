import { UPLOAD_IMG } from '../constants/actionTypes';

export function uploadImgFetchSuccess(item) {
  return {
    type: UPLOAD_IMG.SUCCESS,
    payload: {
      item,
    },
  };
}

export function uploadImgFetchFailure() {
  return {
    type: UPLOAD_IMG.FAILURE,
    payload: {},
  };
}

export function uploadImgFetch({ files, fileType = '1' }) {
  return {
    type: UPLOAD_IMG.REQUEST,
    payload: {
      files,
      fileType,
    },
  };
}

export function uploadImgClear() {
  return {
    type: UPLOAD_IMG.CLEAR,
    payload: {},
  };
}

export function uploadImgRemove(index) {
  return {
    type: UPLOAD_IMG.REMOVE,
    payload: {
      index,
    },
  };
}
