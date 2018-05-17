import {
  PRODUCT_DETAIL_COLORID,
  PRODUCT_DETAIL_VERSIONID,
  PRODUCT_DETAIL_NUMBER,
  PRODUCT_DETAIL,
} from '../constants/actionTypes';

export function productDetailFetchSuccess(entities, result, brand_id, ) {
  return {
    type: PRODUCT_DETAIL.SUCCESS,
    payload: {
      entities,
      result,
      brand_id,
    },
  };
}

export function productDetailFetchFailure() {
  return {
    type: PRODUCT_DETAIL.FAILURE,
    payload: {

    },
  };
}

export function productDetailFetch(
  brand_id,
) {
  return {
    type: PRODUCT_DETAIL.REQUEST,
    payload: {
      brand_id,
    },
  };
}

export function productDetailClear(brand_id) {
  return {
    type: PRODUCT_DETAIL.CLEAR,
    payload: {
      brand_id
    },
  };
}

export function productDetailColorIdFetch(
  colorId,
) {
  return {
    type: PRODUCT_DETAIL_COLORID.REQUEST,
    payload: {
      colorId,
    },
  };
}

export function productDetailVersionIdFetch(
  versionId,
) {
  return {
    type: PRODUCT_DETAIL_VERSIONID.REQUEST,
    payload: {
      versionId,
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
