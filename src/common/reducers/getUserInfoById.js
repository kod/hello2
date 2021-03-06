import { GET_USERINFO_BYID } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  item: {},
};

export default function getUserInfoById(state = initState, action) {
  switch (action.type) {
    case GET_USERINFO_BYID.CLEAR:
      return {
        ...initState,
      };
    case GET_USERINFO_BYID.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERINFO_BYID.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: {
          ...action.payload.item,
          // userType: 2,
        },
      };
    case GET_USERINFO_BYID.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
