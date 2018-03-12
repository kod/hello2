import { combineReducers } from 'redux';
import bannerSwiper from './bannerSwiper';
import bannerHomeType from './bannerHomeType';

const rootReducer = combineReducers({
  bannerSwiper,
  bannerHomeType,
});

export default rootReducer;
