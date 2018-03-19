import { all } from 'redux-saga/effects';
import { bannerSwiperFetchWatch } from './bannerSwiper';
import { bannerHomeTypeFetchWatch } from './bannerHomeType';
import { bannerHomeRecommendFetchWatch } from './bannerHomeRecommend';
import { promotionInfoFetchWatch } from './promotionInfo';


export default function* rootSaga() {
  yield all([
    bannerSwiperFetchWatch(),
    bannerHomeTypeFetchWatch(),
    bannerHomeRecommendFetchWatch(),
    promotionInfoFetchWatch(),
  ]);
}
