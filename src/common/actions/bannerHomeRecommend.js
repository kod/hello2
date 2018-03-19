import { BANNER_HOME_RECOMMEND } from '../constants/actionTypes';

export function bannerHomeRecommendFetchSuccess(items) {
  return {
    type: BANNER_HOME_RECOMMEND.SUCCESS,
    payload: {
      items,
    },
  };
}

export function bannerHomeRecommendFetchFailure() {
  return {
    type: BANNER_HOME_RECOMMEND.FAILURE,
    payload: {

    },
  };
}

export function bannerHomeRecommendFetch(
  refreshing = false,
) {
  return {
    type: BANNER_HOME_RECOMMEND.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function bannerHomeRecommendClear() {
  return {
    type: BANNER_HOME_RECOMMEND.CLEAR,
    payload: {
    },
  };
}
