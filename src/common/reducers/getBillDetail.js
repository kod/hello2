import { GET_BILL_DETAIL } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function getBillDetail(state = initState, action) {
  switch (action.type) {
    case GET_BILL_DETAIL.CLEAR:
      return {
        ...initState,
      };
    case GET_BILL_DETAIL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BILL_DETAIL.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.result,
      };
    case GET_BILL_DETAIL.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
