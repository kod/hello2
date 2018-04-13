import { combineReducers } from 'redux';
import bannerSwiper from './bannerSwiper';
import bannerHomeType from './bannerHomeType';
import bannerHomeRecommend from './bannerHomeRecommend';
import promotionInfo from './promotionInfo';
import mergeGetInfo from './mergeGetInfo';
import i18n from './i18n';

const rootReducer = combineReducers({
  bannerSwiper,
  bannerHomeType,
  bannerHomeRecommend,
  promotionInfo,
  mergeGetInfo,
  i18n,
});

export default rootReducer;
