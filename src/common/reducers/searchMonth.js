import { SEARCH_MONTH } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default function searchMonth(state = initState, action) {
  switch (action.type) {
    case SEARCH_MONTH.CLEAR:
      return {
        ...initState,
      };
    case SEARCH_MONTH.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_MONTH.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.result,
      };
    case SEARCH_MONTH.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
