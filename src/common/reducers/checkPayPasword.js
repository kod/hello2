import { CHECK_PAY_PASWORD } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  isCorrect: false,
};

export default function checkPayPasword(state = initState, action) {
  switch (action.type) {
    case CHECK_PAY_PASWORD.CLEAR:
      return {
        ...initState,
      };
    case CHECK_PAY_PASWORD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_PAY_PASWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isCorrect: action.payload.isCorrect,
      };
    case CHECK_PAY_PASWORD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
