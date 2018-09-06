import { BILL_BY_YEAR } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  isOverdue: false,
  items: {},
};

export default function billByYear(state = initState, action) {
  switch (action.type) {
    case BILL_BY_YEAR.CLEAR:
      return {
        ...initState,
      };
    case BILL_BY_YEAR.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BILL_BY_YEAR.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isOverdue:
          state.isOverdue === false
            ? action.payload.isOverdue
            : state.isOverdue,
        items: {
          ...state.items,
          [action.payload.year]: action.payload.result,
        },
      };
    case BILL_BY_YEAR.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
