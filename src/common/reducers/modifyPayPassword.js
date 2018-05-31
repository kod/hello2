import { MODIFYPAYPASSWORD } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [],
};

export default function modifyPayPassword(state = initState, action) {
  switch (action.type) {
    case MODIFYPAYPASSWORD.CLEAR:
      return {
        ...initState
      };
    case MODIFYPAYPASSWORD.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MODIFYPAYPASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
      };
    case MODIFYPAYPASSWORD.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
