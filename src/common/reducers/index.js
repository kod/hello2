import { combineReducers } from 'redux';
import newestInfo from './newestInfo';

const rootReducer = combineReducers({
  newestInfo,
});

export default rootReducer;
