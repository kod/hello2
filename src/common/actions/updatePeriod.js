import {
  UPDATE_PERIOD,
} from '../constants/actionTypes';

export function updatePeriodFetchSuccess() {
  return {
    type: UPDATE_PERIOD.SUCCESS,
    payload: {
    },
  };
}

export function updatePeriodFetchFailure() {
  return {
    type: UPDATE_PERIOD.FAILURE,
    payload: {

    },
  };
}

export function updatePeriodFetch(params) {
  return {
    type: UPDATE_PERIOD.REQUEST,
    payload: {
      ...params
    },
  };
}
