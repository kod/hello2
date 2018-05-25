import { all } from 'redux-saga/effects';
import {
  watchRehydrate,
  watchLoginRequest,
  watchLoginSuccess,
  logoutWatch,
} from "./auth";
import {
  cartFetchWatch,
  cartNumberRequestWatch,
  cartNumberSuccessWatch,
  cartSelectRequestWatch,
  cartSelectAllRequestWatch,
  cartDeleteRequestWatch,
  cartDeleteSuccessWatch,
  cartAddRequestWatch,
  cartAddSuccessWatch,
} from './cart';
import {
  collectionFetchWatch,
  collectionAddFetchWatch,
  collectionAddSuccessWatch,
  collectionRemoveFetchWatch,
  collectionRemoveSuccessWatch,
} from './collection';
import { watchError } from './error';
import { bannerSwiperFetchWatch } from './bannerSwiper';
import { bannerHomeTypeFetchWatch } from './bannerHomeType';
import { bannerHomeRecommendFetchWatch } from './bannerHomeRecommend';
import { promotionInfoFetchWatch } from './promotionInfo';
import { mergeGetInfoFetchWatch } from './mergeGetInfo';
import { mergeGetDetailFetchWatch } from './mergeGetDetail';
import { mergeGetSlaveFetchWatch } from './mergeGetSlave';
import { mergeCheckFetchWatch } from './mergeCheck';
import { mergeGetMasterFetchWatch } from './mergeGetMaster';
import { adverstInfoFetchWatch } from './adverstInfo';
import { adPhoneFetchWatch } from './adPhone';
import { topComputerFetchWatch } from './topComputer';
import { newComputerFetchWatch } from './newComputer';
import { adDigitalFetchWatch } from './adDigital';
import { userCertificateInfoFetchWatch } from './userCertificateInfo';
import { productDetailInfoFetchWatch } from './productDetailInfo';
import { commentFetchWatch } from './comment';


export default function* rootSaga() {
  yield all([
    watchRehydrate(),
    watchLoginRequest(),
    watchLoginSuccess(),
    logoutWatch(),
    watchError(),
    bannerSwiperFetchWatch(),
    bannerHomeTypeFetchWatch(),
    bannerHomeRecommendFetchWatch(),
    promotionInfoFetchWatch(),
    mergeGetInfoFetchWatch(),
    mergeGetDetailFetchWatch(),
    mergeGetSlaveFetchWatch(),
    mergeCheckFetchWatch(),
    mergeGetMasterFetchWatch(),
    adverstInfoFetchWatch(),
    adPhoneFetchWatch(),
    topComputerFetchWatch(),
    newComputerFetchWatch(),
    adDigitalFetchWatch(),
    userCertificateInfoFetchWatch(),
    cartFetchWatch(),
    cartNumberRequestWatch(),
    cartNumberSuccessWatch(),
    cartSelectRequestWatch(),
    cartSelectAllRequestWatch(),
    cartDeleteRequestWatch(),
    cartDeleteSuccessWatch(),
    cartAddRequestWatch(),
    cartAddSuccessWatch(),
    productDetailInfoFetchWatch(),
    commentFetchWatch(),
    collectionFetchWatch(),
    collectionAddFetchWatch(),
    collectionAddSuccessWatch(),
    collectionRemoveFetchWatch(),
    collectionRemoveSuccessWatch(),
  ]);
}
