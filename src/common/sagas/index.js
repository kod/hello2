import { all } from 'redux-saga/effects';
import { newestInfoWatch } from './newestInfo';
import { bannerSwiperFetchWatch } from './bannerSwiper';
import { bannerHomeTypeFetchWatch } from './bannerHomeType';


export default function* rootSaga() {
  yield all([
    newestInfoWatch(),
    bannerSwiperFetchWatch(),
    bannerHomeTypeFetchWatch(),
  ]);
}
