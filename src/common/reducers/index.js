import { combineReducers } from 'redux';
import bannerSwiper from './bannerSwiper';
import bannerHomeType from './bannerHomeType';
import bannerHomeRecommend from './bannerHomeRecommend';
import promotionInfo from './promotionInfo';
import mergeGetInfo from './mergeGetInfo';
import adverstInfo from './adverstInfo';
import scrollableTabView from './scrollableTabView';
import adPhone from './adPhone';
import topComputer from './topComputer';
import newComputer from './newComputer';
import adDigital from './adDigital';
import i18n from './i18n';
import auth from './auth';

const rootReducer = combineReducers({
  bannerSwiper,
  bannerHomeType,
  bannerHomeRecommend,
  promotionInfo,
  mergeGetInfo,
  adverstInfo,
  scrollableTabView,
  adPhone,
  topComputer,
  newComputer,
  adDigital,
  i18n,
  auth,
});

export default rootReducer;
