import { QUERY_BILL_LIST } from '../constants/actionTypes';

const initState = {
  bill1: {
    // 本期账单
    loading: false,
    loaded: false,
    refreshing: false,
    items: [],
  },
  bill2: {
    // 下期账单
    loading: false,
    loaded: false,
    refreshing: false,
    items: [],
  },
  bill3: {
    // 未出账单
    loading: false,
    loaded: false,
    refreshing: false,
    items: [],
  },
  bill4: {
    // 已还账单
    loading: false,
    loaded: false,
    refreshing: false,
    items: [],
  },
  bill5: {
    // 逾期账单
    loading: false,
    loaded: false,
    refreshing: false,
    items: [],
  },
};

export default function queryBillList(state = initState, action) {
  switch (action.type) {
    case QUERY_BILL_LIST.CLEAR:
      return {
        ...initState,
      };
    case QUERY_BILL_LIST.REQUEST:
      return {
        ...state,
        [`bill${action.payload.period}`]: {
          ...state[`bill${action.payload.period}`],
          loading: true,
        },
      };
    case QUERY_BILL_LIST.SUCCESS:
      return {
        ...state,
        [`bill${action.payload.period}`]: {
          ...state[`bill${action.payload.period}`],
          loading: false,
          loaded: true,
          items: action.payload.items,
        },
      };
    case QUERY_BILL_LIST.FAILURE:
      return {
        ...state,
        [`bill${action.payload.period}`]: {
          ...state[`bill${action.payload.period}`],
          loading: false,
          loaded: true,
        },
      };
    default:
      return state;
  }
}
