import {
  CARD_SUBMIT,
} from "../constants/actionTypes";

export function cardSubmitFetchSuccess() {
  return {
    type: CARD_SUBMIT.SUCCESS,
    payload: {
    },
  };
}

export function cardSubmitFetchFailure() {
  return {
    type: CARD_SUBMIT.FAILURE,
    payload: {
      // rankingMode,
    },
  };
}

export function cardSubmitFetch(params) {
  return {
    type: CARD_SUBMIT.REQUEST,
    payload: {
      ...params
    },
  };
}

export function cardSubmitClear(user) {
  return {
    type: CARD_SUBMIT.CLEAR,
    payload: {
      user,
    },
  };
}
