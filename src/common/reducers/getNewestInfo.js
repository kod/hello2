import { GET_NEWEST_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function adPhone(state = initState, action) {
  switch (action.type) {
    case GET_NEWEST_INFO.CLEAR:
      return {
        ...initState,
      };
    case GET_NEWEST_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NEWEST_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_NEWEST_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
