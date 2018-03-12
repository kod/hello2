import { all } from 'redux-saga/effects';
import { bannerSwiperFetchWatch } from './bannerSwiper';
import { bannerHomeTypeFetchWatch } from './bannerHomeType';


export default function* rootSaga() {
  yield all([
    bannerSwiperFetchWatch(),
    bannerHomeTypeFetchWatch(),
  ]);
}
