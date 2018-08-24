import { BILL_YEAR, BILL_MONTH, BILL_PRICE } from '../constants/actionTypes';

export function billYearFetch(year) {
  return {
    type: BILL_YEAR.REQUEST,
    payload: {
      year,
    },
  };
}

export function billMonthFetch(month) {
  return {
    type: BILL_MONTH.REQUEST,
    payload: {
      month,
    },
  };
}

export function billPriceFetch(price) {
  return {
    type: BILL_PRICE.REQUEST,
    payload: {
      price,
    },
  };
}
