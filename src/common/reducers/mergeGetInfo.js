import { MERGE_GETINFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function bannerHomeType(state = {}, action) {
  switch (action.type) {
    case MERGE_GETINFO.CLEAR:
      return {
        ...initState
      };
    case MERGE_GETINFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MERGE_GETINFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case MERGE_GETINFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
