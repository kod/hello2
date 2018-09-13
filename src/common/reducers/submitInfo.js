import { SUBMIT_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  isTrue: false,
};

export default function submitInfo(state = initState, action) {
  switch (action.type) {
    case SUBMIT_INFO.CLEAR:
      return {
        ...initState,
      };
    case SUBMIT_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: true,
      };
    case SUBMIT_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        isTrue: false,
      };
    default:
      return state;
  }
}
