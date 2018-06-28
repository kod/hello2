import { RECEIVE_VOUCHER } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default function receiveVoucher(state = initState, action) {
  switch (action.type) {
    case RECEIVE_VOUCHER.CLEAR:
      return {
        ...initState
      };
    case RECEIVE_VOUCHER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_VOUCHER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        // certUser: action.payload.certUser,
      };
    case RECEIVE_VOUCHER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
