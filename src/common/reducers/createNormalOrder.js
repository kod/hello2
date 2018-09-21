import { CREATE_NORMAL_ORDER } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  tradeNo: '',
  orderNo: '',
};

export default function createNormalOrder(state = initState, action) {
  switch (action.type) {
    case CREATE_NORMAL_ORDER.CLEAR:
      return {
        ...initState,
      };
    case CREATE_NORMAL_ORDER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NORMAL_ORDER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        tradeNo: action.payload.tradeNo,
        orderNo: action.payload.orderNo,
      };
    case CREATE_NORMAL_ORDER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
