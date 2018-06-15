import { QUERY_ORDER_LIST, QUERY_ORDER_LIST_INDEX } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  scrollTabIndex: 0,
  classfyinfo: [],
};

export default function queryOrderList(state = initState, action) {
  switch (action.type) {
    case QUERY_ORDER_LIST.CLEAR:
      return {
        ...initState
      };
    case QUERY_ORDER_LIST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case QUERY_ORDER_LIST.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        phoneAdList: action.payload.phoneAdList,
      };
    case QUERY_ORDER_LIST.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case QUERY_ORDER_LIST_INDEX.REQUEST:
      return {
        ...state,
        scrollTabIndex: action.payload.scrollTabIndex,
      };
    default:
      return state;
  }
}
