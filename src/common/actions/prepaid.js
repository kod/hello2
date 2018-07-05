import { PREPAID, } from '../constants/actionTypes';

export function prepaidFetch(
  params
) {
  return {
    type: PREPAID.REQUEST,
    payload: {
      ...params,
    },
  };
}
