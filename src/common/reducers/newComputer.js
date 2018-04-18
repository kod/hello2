import { NEW_COMPUTER } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  computernewList: [],
  computernewBanerList: [],
};

export default function newComputer(state = initState, action) {
  switch (action.type) {
    case NEW_COMPUTER.CLEAR:
      return {
        ...initState
      };
    case NEW_COMPUTER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COMPUTER.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        computernewList: action.payload.computernewList,
        computernewBanerList: action.payload.computernewBanerList,
      };
    case NEW_COMPUTER.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
