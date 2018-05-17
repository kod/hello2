import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_OPACITY,
} from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {
    colorArray: [],
    versionArray: [],
    propertiesIdsObject: {},
    imageDesc: [],
    goodsProperties: [],
    imageUrls: [],
    productDetailOpacity: 0,
    productDetailNumber: 1,
  },
};

export default function productDetailInfo(state = initState, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_INFO.CLEAR:
      return {
        ...initState,
      };
    case PRODUCT_DETAIL_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: {
          ...state.item,
          ...action.payload.detail,
          imageUrls: action.payload.detail.imageUrls,
          colorArray: action.payload.colorVersionList.product_color,
          versionArray: action.payload.colorVersionList.product_version,
          propertiesIdsObject: action.payload.propertiesIds,
          imageDesc: action.payload.imageDesc,
          product_detail: action.payload.product_detail,
        }
      };
    case PRODUCT_DETAIL_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        [action.payload.brand_id]: {
          ...state[action.payload.brand_id],
        },
      };
    case PRODUCT_DETAIL_SELECT.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload.productDetail,
          propertiesIdsObject: action.payload.propertiesIdsObject,
        }
      };
    case PRODUCT_DETAIL_NUMBER.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          productDetailNumber: action.payload.number,
        }
      };
    case PRODUCT_DETAIL_OPACITY.REQUEST:
      return {
        ...state,
        item: {
          ...state.item,
          productDetailOpacity: action.payload.opacity,
        }
      };
  default:
      return state;
  }
}
