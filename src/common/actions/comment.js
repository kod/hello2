import { COMMENT } from '../constants/actionTypes';

export function commentFetchSuccess(items) {
  return {
    type: COMMENT.SUCCESS,
    payload: {
      items,
    },
  };
}

export function commentFetchFailure() {
  return {
    type: COMMENT.FAILURE,
    payload: {

    },
  };
}

export function commentFetch(
  brand_id
) {
  return {
    type: COMMENT.REQUEST,
    payload: {
      brand_id,
    },
  };
}

export function commentClear() {
  return {
    type: COMMENT.CLEAR,
    payload: {
    },
  };
}
