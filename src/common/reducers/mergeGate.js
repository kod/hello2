import { MERGE_GATE } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function mergeGate(state = initState, action) {
  switch (action.type) {
    case MERGE_GATE.CLEAR:
      return {
        ...initState
      };
    case MERGE_GATE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MERGE_GATE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items
      };
    case MERGE_GATE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
