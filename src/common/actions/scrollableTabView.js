export const SCROLLTAB_SET_INDEX = 'SCROLLTAB_SET_INDEX';

export function scrollableTabViewIndex(index) {
  return {
    type: SCROLLTAB_SET_INDEX,
    payload: {
      index
    }
  };
}
