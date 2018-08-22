import { BILL_YEAR, BILL_MONTH, BILL_PRICE } from '../constants/actionTypes';
import { billInitDate } from '../helpers';

const billInitDateResult = billInitDate();

const initState = {
  activeYear: billInitDateResult.year,
  activeMonth: billInitDateResult.month,
  nowYear: billInitDateResult.year,
  nowMonth: billInitDateResult.month,
  price: '0',
  totalPrice: -1,
};

export default function bill(state = initState, action) {
  switch (action.type) {
    case BILL_YEAR.REQUEST:
      return {
        ...state,
        activeYear: action.payload.year,
      };
    case BILL_MONTH.REQUEST:
      return {
        ...state,
        activeMonth: action.payload.month,
      };
    case BILL_PRICE.REQUEST:
      return {
        ...state,
        price: action.payload.price,
        totalPrice:
          state.totalPrice === -1 ? action.payload.price : state.totalPrice,
      };
    default:
      return state;
  }
}
