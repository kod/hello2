import { all, fork } from 'redux-saga/effects';

import { watchRequestTypeList } from './category';
import { watchRequestArticleList } from './read';

export default function* rootSaga() {
  yield all([fork(watchRequestTypeList), fork(watchRequestArticleList)]);
}
