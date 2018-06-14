import { QUERY_ORDER_LIST } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
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
    default:
      return state;
  }
}
