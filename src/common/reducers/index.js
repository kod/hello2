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
import returnMoney from './returnMoney';
import getUserInfoById from './getUserInfoById';

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
  returnMoney,
  getUserInfoById,
  form: formReducer,
});

export default rootReducer;
