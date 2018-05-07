import { PRODUCTDETAIL_OPACITY } from '../constants/actionTypes';

export function productdetailOpacityFetch(
  value = 0,
) {
  return {
    type: PRODUCTDETAIL_OPACITY.REQUEST,
    payload: {
      value,
    },
  };
}

