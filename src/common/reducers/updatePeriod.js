import { UPDATE_PERIOD } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default function updatePeriod(state = initState, action) {
  switch (action.type) {
    case UPDATE_PERIOD.CLEAR:
      return {
        ...initState
      };
    case UPDATE_PERIOD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PERIOD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case UPDATE_PERIOD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
