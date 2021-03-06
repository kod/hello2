import {
  MERGE_GETDETAIL,
  PRODUCT_DETAIL_SELECT,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL_OPACITY,
} from '../constants/actionTypes';

export function mergeGetDetailFetchSuccess(
  productDetail,
  detail,
  propertiesIds,
  imageDesc,
) {
  return {
    type: MERGE_GETDETAIL.SUCCESS,
    payload: {
      product_detail: productDetail,
      detail,
      propertiesIds,
      imageDesc,
    },
  };
}

export function mergeGetDetailFetchFailure() {
  return {
    type: MERGE_GETDETAIL.FAILURE,
    payload: {},
  };
}

export function mergeGetDetailFetch(brandid) {
  return {
    type: MERGE_GETDETAIL.REQUEST,
    payload: {
      brandid,
    },
  };
}

export function mergeGetDetailClear(brandId) {
  return {
    type: MERGE_GETDETAIL.CLEAR,
    payload: {
      brand_id: brandId,
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

export function productDetailNumberFetch(number) {
  return {
    type: PRODUCT_DETAIL_NUMBER.REQUEST,
    payload: {
      number,
    },
  };
}

export function productDetailOpacityFetch(opacity = 0) {
  return {
    type: PRODUCT_DETAIL_OPACITY.REQUEST,
    payload: {
      opacity,
    },
  };
}
