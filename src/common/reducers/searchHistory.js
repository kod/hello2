import { SEARCH_HISTORY } from '../constants/actionTypes';

const initState = {
  items: [],
};

export default function searchHistory(state = initState, action) {
  switch (action.type) {
    case SEARCH_HISTORY.CLEAR:
      return {
        ...initState
      };
    case SEARCH_HISTORY.ADD:
      return {
        items: [
          ...action.payload.item,
          ...state.items,
        ].filter((val, key) => {
          return key < 10;
        }),
      };
    case SEARCH_HISTORY.REMOVE:
      return {
        items: state.items.filter((val, key) => {
          return val !== action.payload.item;
        }),
      };
    default:
      return state;
  }
}
