import { SEARCH_MONTH_DETAIL } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function searchMonthDetail(state = initState, action) {
  switch (action.type) {
    case SEARCH_MONTH_DETAIL.CLEAR:
      return {
        ...initState,
      };
    case SEARCH_MONTH_DETAIL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_MONTH_DETAIL.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.result,
      };
    case SEARCH_MONTH_DETAIL.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
