import { all } from 'redux-saga/effects';
import { watchRehydrate, watchLoginRequest } from "./auth";
import { bannerSwiperFetchWatch } from './bannerSwiper';
import { bannerHomeTypeFetchWatch } from './bannerHomeType';
import { bannerHomeRecommendFetchWatch } from './bannerHomeRecommend';
import { promotionInfoFetchWatch } from './promotionInfo';
import { mergeGetInfoFetchWatch } from './mergeGetInfo';
import { adverstInfoFetchWatch } from './adverstInfo';
import { adPhoneFetchWatch } from './adPhone';
import { topComputerFetchWatch } from './topComputer';
import { newComputerFetchWatch } from './newComputer';
import { adDigitalFetchWatch } from './adDigital';


export default function* rootSaga() {
  yield all([
    watchRehydrate(),
    watchLoginRequest(),
    bannerSwiperFetchWatch(),
    bannerHomeTypeFetchWatch(),
    bannerHomeRecommendFetchWatch(),
    promotionInfoFetchWatch(),
    mergeGetInfoFetchWatch(),
    adverstInfoFetchWatch(),
    adPhoneFetchWatch(),
    topComputerFetchWatch(),
    newComputerFetchWatch(),
    adDigitalFetchWatch(),
  ]);
}
