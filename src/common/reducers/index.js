import { combineReducers } from 'redux';
import newestInfo from './newestInfo';
import bannerSwiper from './bannerSwiper';
import bannerHomeType from './bannerHomeType';

const rootReducer = combineReducers({
  bannerSwiper,
  bannerHomeType,
  newestInfo,
});

export default rootReducer;
