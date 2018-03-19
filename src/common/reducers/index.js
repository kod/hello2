import { combineReducers } from 'redux';
import bannerSwiper from './bannerSwiper';
import bannerHomeType from './bannerHomeType';
import bannerHomeRecommend from './bannerHomeRecommend';
import promotionInfo from './promotionInfo';

const rootReducer = combineReducers({
  bannerSwiper,
  bannerHomeType,
  bannerHomeRecommend,
  promotionInfo,
});

export default rootReducer;
