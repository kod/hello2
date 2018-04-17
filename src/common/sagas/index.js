import { all } from 'redux-saga/effects';
import { bannerSwiperFetchWatch } from './bannerSwiper';
import { bannerHomeTypeFetchWatch } from './bannerHomeType';
import { bannerHomeRecommendFetchWatch } from './bannerHomeRecommend';
import { promotionInfoFetchWatch } from './promotionInfo';
import { mergeGetInfoFetchWatch } from './mergeGetInfo';
import { adverstInfoFetchWatch } from './adverstInfo';
import { adPhoneFetchWatch } from './adPhone';


export default function* rootSaga() {
  yield all([
    bannerSwiperFetchWatch(),
    bannerHomeTypeFetchWatch(),
    bannerHomeRecommendFetchWatch(),
    promotionInfoFetchWatch(),
    mergeGetInfoFetchWatch(),
    adverstInfoFetchWatch(),
    adPhoneFetchWatch(),
  ]);
}
