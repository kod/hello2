import { all } from 'redux-saga/effects';
import {
  watchRehydrate,
  // watchLoginRequest,
  // watchLoginSuccess,
  // logoutWatch,
} from './auth';
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
import {
  userAddDetailInfoFetchWatch,
  userAddDetailInfoSuccessWatch,
} from './userAddDetailInfo';
import {
  queryOrderListFetchWatch,
  queryOrderListIndexFetchWatch,
} from './queryOrderList';
import {
  modifyPayPasswordFetchWatch,
  modifyPayPasswordSuccessWatch,
} from './modifyPayPassword';
import {
  updatePeriodFetchWatch,
  updatePeriodSuccessWatch,
} from './updatePeriod';
import {
  repaymentRecordFetchWatch,
  repaymentRecordSuccessWatch,
} from './repaymentRecord';
import {
  receiveVoucherFetchWatch,
  receiveVoucherSuccessWatch,
} from './receiveVoucher';
import {
  getProvidersCardFetchWatch,
  getProvidersCardSuccessWatch,
} from './getProvidersCard';
import {
  get3GProvidersCardFetchWatch,
  get3GProvidersCardSuccessWatch,
} from './get3GProvidersCard';
import {
  loginFetchWatch,
  loginSuccessWatch,
  logoutSuccessWatch,
} from './login';
import {
  changePasswordFetchWatch,
  changePasswordSuccessWatch,
} from './changePassword';
import {
  searchMonthDetailFetchWatch,
  // searchMonthDetailSuccessWatch,
} from './searchMonthDetail';
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
import { orderCreateFetchWatch, orderCreateSuccessWatch } from './orderCreate';
import { orderPayFetchWatch, orderPaySuccessWatch } from './orderPay';
import { queryOrderFetchWatch } from './queryOrder';
import { productDetailInfoFetchWatch } from './productDetailInfo';
import { commentFetchWatch } from './comment';
import { cityInfosFetchWatch } from './cityInfos';
import { schoolInfoFetchWatch } from './schoolInfo';
import { otpFetchWatch } from './otp';
import { returnMoneyFetchWatch } from './returnMoney';
import { getUserInfoByIdFetchWatch } from './getUserInfoById';
import { cardSubmitFetchWatch, cardSubmitSuccessWatch } from './cardSubmit';
import { cardQueryFetchWatch } from './cardQuery';
import { registerFetchWatch, registerSuccessWatch } from './register';
import { billByYearFetchWatch, billByYearSuccessWatch } from './billByYear';
import { searchMonthFetchWatch, searchMonthSuccessWatch } from './searchMonth';
import { billDetailsFetchWatch, billDetailsSuccessWatch } from './billDetails';
import { queryGoodsFetchWatch, queryGoodsSuccessWatch } from './queryGoods';
import { collectFilesFetchWatch } from './collectFiles';
import { getMenuFetchWatch } from './getMenu';
import { getAllProductInfoFetchWatch } from './getAllProductInfo';
import { getVoucherFetchWatch } from './getVoucher';
import { getVoucherListFetchWatch } from './getVoucherList';
import { getPhoneRechargeFetchWatch } from './getPhoneRecharge';
import { getProvidersValueFetchWatch } from './getProvidersValue';
import { findProductsFetchWatch } from './findProducts';
import { orderCancelFetchWatch, orderCancelSuccessWatch } from './orderCancel';
import { judgeVoucherFetchWatch } from './judgeVoucher';
import { getSquaresInfoFetchWatch } from './getSquaresInfo';
import { addEvaluationFetchWatch } from './addEvaluation';
import { getNewestInfoFetchWatch } from './getNewestInfo';
import { getAdverstTopInfoFetchWatch } from './getAdverstTopInfo';
import { getBillDetailFetchWatch } from './getBillDetail';
import { checkPayPaswordFetchWatch } from './checkPayPasword';
import { uploadImgFetchWatch } from './uploadImg';
import { getImgUrlFetchWatch } from './getImgUrl';

export default function* rootSaga() {
  yield all([
    watchRehydrate(),
    // watchLoginRequest(),
    // watchLoginSuccess(),
    // logoutWatch(),
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
    queryOrderListFetchWatch(),
    queryOrderListIndexFetchWatch(),
    orderPayFetchWatch(),
    orderPaySuccessWatch(),
    queryOrderFetchWatch(),
    cardSubmitFetchWatch(),
    cardSubmitSuccessWatch(),
    cardQueryFetchWatch(),
    registerFetchWatch(),
    registerSuccessWatch(),
    updatePeriodFetchWatch(),
    updatePeriodSuccessWatch(),
    billByYearFetchWatch(),
    billByYearSuccessWatch(),
    searchMonthFetchWatch(),
    searchMonthSuccessWatch(),
    searchMonthDetailFetchWatch(),
    // searchMonthDetailSuccessWatch(),
    repaymentRecordFetchWatch(),
    repaymentRecordSuccessWatch(),
    billDetailsFetchWatch(),
    billDetailsSuccessWatch(),
    queryGoodsFetchWatch(),
    queryGoodsSuccessWatch(),
    collectFilesFetchWatch(),
    getMenuFetchWatch(),
    getAllProductInfoFetchWatch(),
    getVoucherFetchWatch(),
    receiveVoucherFetchWatch(),
    receiveVoucherSuccessWatch(),
    getVoucherListFetchWatch(),
    getPhoneRechargeFetchWatch(),
    getProvidersCardFetchWatch(),
    getProvidersCardSuccessWatch(),
    get3GProvidersCardFetchWatch(),
    get3GProvidersCardSuccessWatch(),
    getProvidersValueFetchWatch(),
    findProductsFetchWatch(),
    orderCancelFetchWatch(),
    orderCancelSuccessWatch(),
    judgeVoucherFetchWatch(),
    getSquaresInfoFetchWatch(),
    loginFetchWatch(),
    loginSuccessWatch(),
    logoutSuccessWatch(),
    changePasswordFetchWatch(),
    changePasswordSuccessWatch(),
    addEvaluationFetchWatch(),
    getNewestInfoFetchWatch(),
    getAdverstTopInfoFetchWatch(),
    getBillDetailFetchWatch(),
    checkPayPaswordFetchWatch(),
    uploadImgFetchWatch(),
    getImgUrlFetchWatch(),
  ]);
}
