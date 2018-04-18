import { TOP_COMPUTER } from '../constants/actionTypes';

export function topComputerFetchSuccess(computeradImgList, classfyinfo) {
  return {
    type: TOP_COMPUTER.SUCCESS,
    payload: {
      computeradImgList,
      classfyinfo,
    },
  };
}

export function topComputerFetchFailure() {
  return {
    type: TOP_COMPUTER.FAILURE,
    payload: {

    },
  };
}

export function topComputerFetch(
  refreshing = false,
) {
  return {
    type: TOP_COMPUTER.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function topComputerClear() {
  return {
    type: TOP_COMPUTER.CLEAR,
    payload: {
    },
  };
}
