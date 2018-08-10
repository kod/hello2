import { GET_SQUARES_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function getSquaresInfo(state = initState, action) {
  switch (action.type) {
    case GET_SQUARES_INFO.CLEAR:
      return {
        ...initState,
      };
    case GET_SQUARES_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SQUARES_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case GET_SQUARES_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
