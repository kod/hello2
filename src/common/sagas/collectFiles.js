import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { collectFilesFetchSuccess, collectFilesFetchFailure } from '../actions/collectFiles';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { COLLECT_FILES } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* collectFilesFetchWatchHandle(action) {
  try {
    const {
      productid = '1',
      files,
    } = action.payload;
    const formData = new FormData();
    formData.append('files', {
      uri: files.uri,
      type: files.type || 'image/jpeg',
      name: files.name || 'photo.jpg',
    });
    formData.append('productid', productid);

    const response = yield apply(buyoo, buyoo.collectFiles, [
      formData
    ]);

    if (response.code !== 10000) {
      yield put(collectFilesFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }
    yield put(collectFilesFetchSuccess(response.url));
  } catch (err) {
    yield put(collectFilesFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* collectFilesFetchWatch() {
  yield takeEvery(COLLECT_FILES.REQUEST, collectFilesFetchWatchHandle);
}
