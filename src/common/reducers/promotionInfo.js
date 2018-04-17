import { PROMOTION_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function promotionInfo(state = {}, action) {
  switch (action.type) {
    case PROMOTION_INFO.CLEAR:
      return {
        ...initState
      };
    case PROMOTION_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROMOTION_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case PROMOTION_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
