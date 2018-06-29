import {
  GET_VOUCHER_LIST,
} from '../constants/actionTypes';

import { COUPONMY_TABNAVIGATOR_MAP } from "../constants";

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  CouponMyUnused: [],
  CouponMyUsed: [],
  CouponMyPast: [],
};

export default function getVoucherList(state = initState, action) {
  switch (action.type) {
    case GET_VOUCHER_LIST.CLEAR:
      return {
        ...initState
      };
    case GET_VOUCHER_LIST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VOUCHER_LIST.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        [COUPONMY_TABNAVIGATOR_MAP[action.payload.status]]: action.payload.items,
      };
    case GET_VOUCHER_LIST.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
