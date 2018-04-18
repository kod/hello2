import { NEW_COMPUTER } from '../constants/actionTypes';

export function newComputerFetchSuccess(computernewList, computernewBanerList) {
  return {
    type: NEW_COMPUTER.SUCCESS,
    payload: {
      computernewList,
      computernewBanerList,
    },
  };
}

export function newComputerFetchFailure() {
  return {
    type: NEW_COMPUTER.FAILURE,
    payload: {

    },
  };
}

export function newComputerFetch(
  refreshing = false,
) {
  return {
    type: NEW_COMPUTER.REQUEST,
    payload: {
      refreshing,
    },
  };
}

export function newComputerClear() {
  return {
    type: NEW_COMPUTER.CLEAR,
    payload: {
    },
  };
}
