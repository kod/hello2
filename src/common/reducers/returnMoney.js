import { RETURN_MONEY } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: {},
  payrateValue: 0.1,
  repaymentmonthsValue: 3,
  payrateList: [0.1, 0.2, 0.3, 0.4, 0.5, 1],
  repaymentmonthsList: [3, 6, 9, 12],
};

export default function returnMoney(state = initState, action) {
  switch (action.type) {
    case RETURN_MONEY.CLEAR:
      return {
        ...initState
      };
    case RETURN_MONEY.REQUEST:
      return {
        ...state,
        loading: true,
        [action.payload.key]: action.payload.value,
      };
    case RETURN_MONEY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: {
          ...state.items,
          ...action.payload.item,
        },
      };
    case RETURN_MONEY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
