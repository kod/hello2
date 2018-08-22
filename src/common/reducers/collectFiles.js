import { COLLECT_FILES } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  images: [],
};

export default function collectFiles(state = initState, action) {
  switch (action.type) {
    case COLLECT_FILES.CLEAR:
      return {
        ...initState,
      };
    case COLLECT_FILES.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COLLECT_FILES.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        images: [...state.images, action.payload.item],
      };
    case COLLECT_FILES.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case COLLECT_FILES.REMOVE:
      return {
        ...state,
        loading: false,
        loaded: true,
        images: state.images.filter((val, key) => key !== action.payload.index),
      };
    default:
      return state;
  }
}
