import { GET_ALL_PRODUCT_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
  currentPage: 1,
  totalPage: 1,
  pagesize: 6,
};

export default function getAllProductInfo(state = initState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT_INFO.CLEAR:
      return {
        ...initState,
      };
    case GET_ALL_PRODUCT_INFO.REQUEST:
      return {
        ...state,
        loading: true,
        refreshing: true,
      };
    case GET_ALL_PRODUCT_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        refreshing: false,
        items: [...new Set([...state.items, ...action.payload.items])],
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
      };
    case GET_ALL_PRODUCT_INFO.FAILURE:
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
