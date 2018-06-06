import { RETURN_MONEY } from '../constants/actionTypes';

export function returnMoneyFetchSuccess(item) {
  return {
    type: RETURN_MONEY.SUCCESS,
    payload: {
      item
    },
  };
}

export function returnMoneyFetchFailure() {
  return {
    type: RETURN_MONEY.FAILURE,
    payload: {

    },
  };
}

export function returnMoneyFetch(
  params
) {
  return {
    type: RETURN_MONEY.REQUEST,
    payload: {
      ...params
    },
  };
}

export function returnMoneyClear() {
  return {
    type: RETURN_MONEY.CLEAR,
    payload: {
    },
  };
}
