import { CARD_SUBMIT } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
};

export default function cardSubmit(state = initState, action) {
  switch (action.type) {
    case CARD_SUBMIT.CLEAR:
      return {
        ...initState
      };
    case CARD_SUBMIT.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CARD_SUBMIT.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        // certUser: action.payload.certUser,
      };
    case CARD_SUBMIT.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
