import {
  PRODUCT_DETAIL_INFO,
  PRODUCT_DETAIL_SELECT,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_OPACITY,
} from '../constants/actionTypes';

export function productDetailInfoFetchSuccess(product_detail, detail, propertiesIds, colorVersionList, imageDesc) {
  return {
    type: PRODUCT_DETAIL_INFO.SUCCESS,
    payload: {
      product_detail,
      detail,
      propertiesIds,
      colorVersionList,
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

export function productDetailNumberFetch(
  number,
) {
  return {
    type: PRODUCT_DETAIL_NUMBER.REQUEST,
    payload: {
      number,
    },
  };
}

export function productDetailOpacityFetch(
  opacity = 0,
) {
  return {
    type: PRODUCT_DETAIL_OPACITY.REQUEST,
    payload: {
      opacity,
    },
  };
}