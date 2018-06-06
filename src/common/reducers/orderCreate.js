import { ORDER_CREATE } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  classfyinfo: [],
  phoneAdList: [],
  phoneAdBanerList: [],
};

export default function orderCreate(state = initState, action) {
  switch (action.type) {
    case ORDER_CREATE.CLEAR:
      return {
        ...initState
      };
    case ORDER_CREATE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        phoneAdList: action.payload.phoneAdList,
        phoneAdBanerList: action.payload.phoneAdBanerList,
        classfyinfo: action.payload.classfyinfo,
      };
    case ORDER_CREATE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
