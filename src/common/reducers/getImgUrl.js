import { GET_IMG_URL } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  urls: '',
};

export default function getImgUrl(state = initState, action) {
  switch (action.type) {
    case GET_IMG_URL.CLEAR:
      return {
        ...initState,
      };
    case GET_IMG_URL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_IMG_URL.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        urls: action.payload.urls,
      };
    case GET_IMG_URL.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
