import { takeEvery, apply, put } from 'redux-saga/effects';
import { newestInfoFetchSuccess, newestInfoFetchFailure } from '../actions/newestInfo';
// import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { NEWESTINFO } from '../constants/actionTypes';

export function* newestInfoHandle() {
  try {
    // response = yield apply(pixiv, pixiv.illustRanking, [finalOptions]);

    const response = yield apply(buyoo, buyoo.getNewestInfo, [{
      appId: "",
      charset: "UTF-8",
      classfy_id: "0",
      currentPage: "1",
      encrypt: "78badee7d1d29269b9afb5389aee6d11",
      signType: "232d3721d7461bdfc771ce28408ce7c9",
      method: "fun.newest.query",
      pagesize: "5",
      position: "1",
      timestamp: "2017-09-06 11:30:50",
      type_id: "0",
      version: "1.0"
    }]);
    
    console.log(response);
    
    yield put(
      newestInfoFetchSuccess(
        // rankingMode,
        // response.next_url,
      ),
    );
  } catch (err) {
    yield put(newestInfoFetchFailure(rankingMode));
    // yield put(addError(err));
  }
}

export function* newestInfoWatch() {
  yield takeEvery(NEWESTINFO.REQUEST, newestInfoHandle);
}
