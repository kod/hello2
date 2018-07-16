import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import bannerSwiper from './bannerSwiper';
import bannerHomeType from './bannerHomeType';
import bannerHomeRecommend from './bannerHomeRecommend';
import promotionInfo from './promotionInfo';
import mergeGetInfo from './mergeGetInfo';
import mergeGetDetail from './mergeGetDetail';
import mergeGetSlave from './mergeGetSlave';
import mergeCheck from './mergeCheck';
import mergeGetMaster from './mergeGetMaster';
import adverstInfo from './adverstInfo';
import scrollableTabView from './scrollableTabView';
import adPhone from './adPhone';
import topComputer from './topComputer';
import newComputer from './newComputer';
import adDigital from './adDigital';
import i18n from './i18n';
import auth from './auth';
import userCertificateInfo from './userCertificateInfo';
import certifiedInformation from './certifiedInformation';
import cart from './cart';
import productDetail from './productDetail';
import productDetailInfo from './productDetailInfo';
import entities from './entities';
import comment from './comment';
import collection from './collection';
import address from './address';
import cityInfos from './cityInfos';
import schoolInfo from './schoolInfo';
import otp from './otp';
import orderCreate from './orderCreate';
import orderPay from './orderPay';
import queryOrder from './queryOrder';
import returnMoney from './returnMoney';
import getUserInfoById from './getUserInfoById';
import cardSubmit from './cardSubmit';
import cardQuery from './cardQuery';
import register from './register';
import userAddDetailInfo from './userAddDetailInfo';
import queryOrderList from './queryOrderList';
import updatePeriod from './updatePeriod';
import billByYear from './billByYear';
import searchMonth from './searchMonth';
import bill from './bill';
import repaymentRecord from './repaymentRecord';
import billDetails from './billDetails';
import queryGoods from './queryGoods';
import collectFiles from './collectFiles';
import getMenu from './getMenu';
import getAllProductInfo from './getAllProductInfo';
import findProducts from './findProducts';
import getVoucher from './getVoucher';
import receiveVoucher from './receiveVoucher';
import getVoucherList from './getVoucherList';
import getPhoneRecharge from './getPhoneRecharge';
import prepaid from './prepaid';
import getProvidersCard from './getProvidersCard';
import getProvidersValue from './getProvidersValue';
import get3GProvidersCard from './get3GProvidersCard';
import searchHistory from './searchHistory';
import orderCancel from './orderCancel';
import couponSelect from './couponSelect';
import judgeVoucher from './judgeVoucher';
import mergeGate from './mergeGate';

const rootReducer = combineReducers({
  bannerSwiper,
  bannerHomeType,
  bannerHomeRecommend,
  promotionInfo,
  mergeGetInfo,
  mergeGetDetail,
  mergeGetSlave,
  mergeCheck,
  mergeGetMaster,
  adverstInfo,
  scrollableTabView,
  adPhone,
  topComputer,
  newComputer,
  adDigital,
  i18n,
  auth,
  userCertificateInfo,
  certifiedInformation,
  cart,
  productDetail,
  productDetailInfo,
  entities,
  comment,
  collection,
  address,
  cityInfos,
  schoolInfo,
  otp,
  orderCreate,
  orderPay,
  queryOrder,
  returnMoney,
  getUserInfoById,
  cardSubmit,
  cardQuery,
  register,
  userAddDetailInfo,
  queryOrderList,
  updatePeriod,
  billByYear,
  searchMonth,
  bill,
  repaymentRecord,
  billDetails,
  queryGoods,
  collectFiles,
  getMenu,
  getAllProductInfo,
  findProducts,
  getVoucher,
  receiveVoucher,
  getVoucherList,
  getPhoneRecharge,
  prepaid,
  getProvidersCard,
  getProvidersValue,
  get3GProvidersCard,
  searchHistory,
  orderCancel,
  couponSelect,
  judgeVoucher,
  mergeGate,
  form: formReducer,
});

export default rootReducer;
