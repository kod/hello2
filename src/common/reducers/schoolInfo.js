import { SCHOOL_INFOS } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function schoolInfo(state = initState, action) {
  switch (action.type) {
    case SCHOOL_INFOS.CLEAR:
      return {
        ...initState
      };
    case SCHOOL_INFOS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SCHOOL_INFOS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items.sort((a, b) => a.staging - b.staging < 0 ? 1 : -1),
      };
    case SCHOOL_INFOS.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
