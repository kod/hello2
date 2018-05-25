import { MERGE_CHECK } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default function mergeCheck(state = initState, action) {
  switch (action.type) {
    case MERGE_CHECK.CLEAR:
      return {
        ...initState
      };
    case MERGE_CHECK.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MERGE_CHECK.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.payload.item
      };
    case MERGE_CHECK.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
