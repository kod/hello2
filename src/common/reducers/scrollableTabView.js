import { SCROLLTAB_SET_INDEX } from '../actions/scrollableTabView';

const initState = {
  index: 0,
};

export default function scrollableTabView(state = initState, action) {
  switch (action.type) {
    case SCROLLTAB_SET_INDEX:
      return {
        index: action.payload.index,
      };
    default:
      return state;
  }
}
