import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
} from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  result: {},
  item: {
    colorArray: [],
    versionArray: [],
    propertiesIdsObject: {},
    imageDesc: [],
    goodsProperties: [],
    imageUrls: [],
    productDetailOpacity: 0,
  },
};

export default function productDetailInfo(state = initState, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_INFO.CLEAR:
      return {
        ...state,
      };
    case PRODUCT_DETAIL_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_INFO.SUCCESS:
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload.detail,
          imageUrls: action.payload.detail.imageUrls,
          colorArray: action.payload.colorVersionList.product_color,
          versionArray: action.payload.colorVersionList.product_version,
          propertiesIdsObject: action.payload.propertiesIds,
          imageDesc: action.payload.imageDesc,
          goodsProperties: action.payload.goodsProperties,
          product_detail: action.payload.product_detail,
        }
      };
    case PRODUCT_DETAIL_INFO.FAILURE:
      return {
        ...state,
        [action.payload.brand_id]: {
          ...state[action.payload.brand_id],
          loading: false,
          loaded: true,
        },
      };
    case PRODUCT_DETAIL_SELECT.REQUEST:
      // const findResult = state.item.product_detail.filter((val, key) => {
      //   return Object.values(action.payload.propertiesIdsObject).every((val1, key1) => val.propertiesIds.indexOf(val1 + '') !== -1)
      // })[0];
      // const propertiesIdsObject = findResult ? action.payload.propertiesIdsObject : state.item.propertiesIdsObject;
      // const findResultInsert = findResult ? findResult : state.item.product_detail[0];
      // console.log(propertiesIdsObject);
      // console.log(findResultInsert);
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload.productDetail,
          propertiesIdsObject: action.payload.propertiesIdsObject,
        }
      };
  default:
      return state;
  }
}
