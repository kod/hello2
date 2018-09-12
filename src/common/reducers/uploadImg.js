import { UPLOAD_IMG } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  image: '',
};

export default function uploadImg(state = initState, action) {
  switch (action.type) {
    case UPLOAD_IMG.CLEAR:
      return {
        ...initState,
      };
    case UPLOAD_IMG.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMG.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        image: action.payload.item,
      };
    case UPLOAD_IMG.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
