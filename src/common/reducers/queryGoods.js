import { QUERY_GOODS } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
};

export default function queryGoods(state = initState, action) {
  switch (action.type) {
    case QUERY_GOODS.CLEAR:
      return {
        ...initState
      };
    case QUERY_GOODS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case QUERY_GOODS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.result,
      };
    case QUERY_GOODS.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
