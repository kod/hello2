import { GET_3GPROVIDERS_CARD } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function get3GProvidersCard(state = initState, action) {
  switch (action.type) {
    case GET_3GPROVIDERS_CARD.CLEAR:
      return {
        ...initState
      };
    case GET_3GPROVIDERS_CARD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_3GPROVIDERS_CARD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_3GPROVIDERS_CARD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
