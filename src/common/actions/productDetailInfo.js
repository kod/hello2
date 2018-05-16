import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
} from '../constants/actionTypes';

export function productDetailInfoFetchSuccess(product_detail, detail, propertiesIds, colorVersionList, goodsProperties, imageDesc) {
  return {
    type: PRODUCT_DETAIL_INFO.SUCCESS,
    payload: {
      product_detail,
      detail,
      propertiesIds,
      colorVersionList,
      goodsProperties,
      imageDesc,
    },
  };
}

export function productDetailInfoFetchFailure() {
  return {
    type: PRODUCT_DETAIL_INFO.FAILURE,
    payload: {

    },
  };
}

export function productDetailInfoFetch(
  brand_id,
  propertiesIds,
) {
  return {
    type: PRODUCT_DETAIL_INFO.REQUEST,
    payload: {
      brand_id,
      propertiesIds,
    },
  };
}

export function productDetailInfoClear(brand_id) {
  return {
    type: PRODUCT_DETAIL_INFO.CLEAR,
    payload: {
      brand_id
    },
  };
}

export function productDetailSelect(propertiesIdsObject, productDetail) {
  return {
    type: PRODUCT_DETAIL_SELECT.REQUEST,
    payload: {
      propertiesIdsObject,
      productDetail,
    },
  };
}