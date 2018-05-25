import { MERGE_GETSLAVE } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function mergeGetInfo(state = initState, action) {
  switch (action.type) {
    case MERGE_GETSLAVE.CLEAR:
      return {
        ...initState
      };
    case MERGE_GETSLAVE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MERGE_GETSLAVE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case MERGE_GETSLAVE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
