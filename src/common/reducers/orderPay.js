import { ORDER_PAY } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  classfyinfo: [],
  phoneAdList: [],
  phoneAdBanerList: [],
};

export default function orderPay(state = initState, action) {
  switch (action.type) {
    case ORDER_PAY.CLEAR:
      return {
        ...initState
      };
    case ORDER_PAY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_PAY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        phoneAdList: action.payload.phoneAdList,
        phoneAdBanerList: action.payload.phoneAdBanerList,
        classfyinfo: action.payload.classfyinfo,
      };
    case ORDER_PAY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
