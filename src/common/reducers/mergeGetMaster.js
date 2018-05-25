import { MERGE_GETMASTER } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function mergeCheck(state = initState, action) {
  switch (action.type) {
    case MERGE_GETMASTER.CLEAR:
      return {
        ...initState
      };
    case MERGE_GETMASTER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MERGE_GETMASTER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case MERGE_GETMASTER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
