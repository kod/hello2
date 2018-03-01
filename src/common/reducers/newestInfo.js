import { NEWESTINFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  offset: 0,
  url: null,
  nextUrl: null,
};

export default function newestInfo(state = initState, action) {
  switch (action.type) {
    case NEWESTINFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWESTINFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        refreshing: false,
      };
    case NEWESTINFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        refreshing: false,
      };
    default:
      return state;
  }
}
