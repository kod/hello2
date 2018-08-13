import { GET_MENU, GET_MENU_INDEX } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  levelOne: [],
  levelTwo: [],
  levelOneIndex: 0,
};

export default function getMenu(state = initState, action) {
  switch (action.type) {
    case GET_MENU.CLEAR:
      return {
        ...initState,
      };
    case GET_MENU.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MENU.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        levelOne: action.payload.levelOne,
        levelTwo: action.payload.levelTwo,
      };
    case GET_MENU.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case GET_MENU_INDEX.REQUEST:
      return {
        ...state,
        levelOneIndex: action.payload.index,
      };
    default:
      return state;
  }
}
