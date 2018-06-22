import { REPAYMENT_RECORD } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default function repaymentRecord(state = initState, action) {
  switch (action.type) {
    case REPAYMENT_RECORD.CLEAR:
      return {
        ...initState
      };
    case REPAYMENT_RECORD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REPAYMENT_RECORD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.result,
      };
    case REPAYMENT_RECORD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
