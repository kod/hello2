import { all } from 'redux-saga/effects';
import { newestInfoWatch } from './newestInfo';


export default function* rootSaga() {
  yield all([
    newestInfoWatch(),
  ]);
}
