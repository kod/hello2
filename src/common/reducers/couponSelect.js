import { COUPON_SELECT } from '../constants/actionTypes';

const initState = {
  item: {},
};

export default function couponSelect(state = initState, action) {
  switch (action.type) {
    case COUPON_SELECT.CLEAR:
      return {
        ...initState,
      };
    case COUPON_SELECT.REQUEST:
      return {
        ...state,
        item: action.payload.item,
      };
    default:
      return state;
  }
}
