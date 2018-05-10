import { PRODUCTDETAIL_OPACITY } from '../constants/actionTypes';

const initState = {
  value: 0,
};

export default function productdetailOpacity(state = initState, action) {
  switch (action.type) {
    case PRODUCTDETAIL_OPACITY.REQUEST:
      return {
        ...state,
        value: action.payload.value,
      };
    default:
      return state;
  }
}
