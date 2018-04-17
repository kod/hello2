import { BANNER_HOME_RECOMMEND } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function bannerHomeRecommend(state = {}, action) {
  switch (action.type) {
    case BANNER_HOME_RECOMMEND.CLEAR:
      return {
        ...initState
      };
    case BANNER_HOME_RECOMMEND.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BANNER_HOME_RECOMMEND.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case BANNER_HOME_RECOMMEND.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
