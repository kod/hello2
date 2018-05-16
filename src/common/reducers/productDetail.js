import {
  PRODUCT_DETAIL_OPACITY,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_COLORID,
  PRODUCT_DETAIL_VERSIONID,
  PRODUCT_DETAIL,
} from '../constants/actionTypes';

const initState = {
  opacity: 0,
  number: '0',
  colorId: null,
  versionId: null,
};

export default function productDetail(state = initState, action) {
  switch (action.type) {
    case PRODUCT_DETAIL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_OPACITY.REQUEST:
      return {
        ...state,
        opacity: action.payload.opacity,
      };
    case PRODUCT_DETAIL_COLORID.REQUEST:
      return {
        ...state,
        colorId: parseInt(action.payload.colorId),
      };
    case PRODUCT_DETAIL_VERSIONID.REQUEST:
      return {
        ...state,
        versionId: parseInt(action.payload.versionId),
      };
    case PRODUCT_DETAIL_NUMBER.REQUEST:
      return {
        ...state,
        number: action.payload.number,
      };
    default:
      return state;
  }
}
