import { GET_PROVIDERS_CARD } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function getProvidersCard(state = initState, action) {
  switch (action.type) {
    case GET_PROVIDERS_CARD.CLEAR:
      return {
        ...initState
      };
    case GET_PROVIDERS_CARD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROVIDERS_CARD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_PROVIDERS_CARD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
