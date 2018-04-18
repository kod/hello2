import { TOP_COMPUTER } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  classfyinfo: [],
  computeradImgList: [],
};

export default function topComputer(state = initState, action) {
  switch (action.type) {
    case TOP_COMPUTER.CLEAR:
      return {
        ...initState
      };
    case TOP_COMPUTER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOP_COMPUTER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        computeradImgList: action.payload.computeradImgList,
        classfyinfo: action.payload.classfyinfo,
      };
    case TOP_COMPUTER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
