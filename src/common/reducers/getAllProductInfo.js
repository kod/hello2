import { GET_ALL_PRODUCT_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function getAllProductInfo(state = initState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT_INFO.CLEAR:
      return {
        ...initState
      };
    case GET_ALL_PRODUCT_INFO.REQUEST:
      return {
        ...state,
        params: action.payload.params,
        loading: true,
      };
    case GET_ALL_PRODUCT_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_ALL_PRODUCT_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
