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
import {
  addressFetchWatch,
  addressAddFetchWatch,
  addressAddSuccessWatch,
  addressRemoveWatch,
  addressRemoveSuccessWatch,
  addressModifyWatch,
  addressModifySuccessWatch,
} from './address';
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
import {
  userCertificateInfoFetchWatch,
  userAddDetailInfoFetchWatch,
  userAddDetailInfoSuccessWatch,
} from './userCertificateInfo';
import {
  orderCreateFetchWatch,
  orderCreateSuccessWatch,
} from './orderCreate';
import {
  orderPayFetchWatch,
} from './orderPay';
import {
  queryOrderFetchWatch,
} from './queryOrder';
import { productDetailInfoFetchWatch } from './productDetailInfo';
import { commentFetchWatch } from './comment';
import { cityInfosFetchWatch } from './cityInfos';
import { schoolInfoFetchWatch } from './schoolInfo';
import { otpFetchWatch } from './otp';
import {
  modifyPayPasswordFetchWatch,
  modifyPayPasswordSuccessWatch,
} from './modifyPayPassword';
import { returnMoneyFetchWatch } from './returnMoney';
import { getUserInfoByIdFetchWatch } from './getUserInfoById';
import { cardSubmitFetchWatch } from './cardSubmit';
import { cardQueryFetchWatch } from './cardQuery';


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
    userAddDetailInfoFetchWatch(),
    userAddDetailInfoSuccessWatch(),  
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
    addressFetchWatch(),
    addressAddFetchWatch(),
    addressAddSuccessWatch(),
    addressRemoveWatch(),
    addressRemoveSuccessWatch(),
    addressModifyWatch(),
    addressModifySuccessWatch(),
    cityInfosFetchWatch(),
    schoolInfoFetchWatch(),
    otpFetchWatch(),
    modifyPayPasswordFetchWatch(),
    modifyPayPasswordSuccessWatch(),
    returnMoneyFetchWatch(),
    getUserInfoByIdFetchWatch(),
    orderCreateFetchWatch(),
    orderCreateSuccessWatch(),
    orderPayFetchWatch(),
    queryOrderFetchWatch(),
    cardSubmitFetchWatch(),
    cardQueryFetchWatch(),
  ]);
}
