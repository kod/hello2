import { BILL_DETAILS } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default function billDetails(state = initState, action) {
  switch (action.type) {
    case BILL_DETAILS.CLEAR:
      return {
        ...initState
      };
    case BILL_DETAILS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BILL_DETAILS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.result,
      };
    case BILL_DETAILS.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
