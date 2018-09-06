import { CARD_QUERY } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default function cardQuery(state = initState, action) {
  switch (action.type) {
    case CARD_QUERY.CLEAR:
      return {
        ...initState,
      };
    case CARD_QUERY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CARD_QUERY.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: {
          ...action.payload.item,
          // status: 0,
          // availableBalance: 8000000,
          // availableBalance: 7990000,
          // availableBalance: 7989999,
          // availableBalance: 3995001,
          // availableBalance: 3995000,
          // availableBalance: 3994999,
        },
      };
    case CARD_QUERY.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
