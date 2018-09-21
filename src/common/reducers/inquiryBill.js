import { INQUIRY_BILL } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function inquiryBill(state = initState, action) {
  switch (action.type) {
    case INQUIRY_BILL.CLEAR:
      return {
        ...initState,
      };
    case INQUIRY_BILL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INQUIRY_BILL.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case INQUIRY_BILL.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
