import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  uploadImgFetchSuccess,
  uploadImgFetchFailure,
} from '../actions/uploadImg';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { UPLOAD_IMG } from '../constants/actionTypes';
import { getAuthUserFunid } from '../selectors';

export function* uploadImgFetchWatchHandle(action) {
  const { files, fileType } = action.payload;
  const funid = yield select(getAuthUserFunid);
  try {
    const formData = new FormData();
    formData.append('fileImg', {
      uri: files.uri,
      type: files.type || 'image/jpeg',
      name: files.name || 'photo.jpg',
    });
    formData.append('fileType', fileType);
    formData.append('funid', funid);

    const response = yield apply(buyoo, buyoo.uploadImg, [formData]);
    console.log(response);

    if (response.code !== 10000) {
      yield put(uploadImgFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(uploadImgFetchSuccess(response.url));
    }
  } catch (err) {
    console.log(err);
    yield put(uploadImgFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* uploadImgFetchWatch() {
  yield takeEvery(UPLOAD_IMG.REQUEST, uploadImgFetchWatchHandle);
}
