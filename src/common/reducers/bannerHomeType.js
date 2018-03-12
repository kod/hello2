import { BANNER_HOME_TYPE } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function bannerHomeType(state = {}, action) {
  switch (action.type) {
    case BANNER_HOME_TYPE.CLEAR:
      return {
        ...initState
      };
    case BANNER_HOME_TYPE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BANNER_HOME_TYPE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case BANNER_HOME_TYPE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
