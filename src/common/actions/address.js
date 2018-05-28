import {
  ADDRESS,
  ADDRESS_ADD,
  ADDRESS_REMOVE,
  ADDRESS_MODIFY,
} from '../constants/actionTypes';

export function addressFetchSuccess(items) {
  return {
    type: ADDRESS.SUCCESS,
    payload: {
      items,
    },
  };
}

export function addressFetchFailure() {
  return {
    type: ADDRESS.FAILURE,
    payload: {

    },
  };
}

export function addressFetch(
  refreshing = false
) {
  return {
    type: ADDRESS.REQUEST,
    payload: {
      refreshing
    },
  };
}

export function addressClear() {
  return {
    type: ADDRESS.CLEAR,
    payload: {
    },
  };
}

export function addressAddSuccess() {
  return {
    type: ADDRESS_ADD.SUCCESS,
    payload: {

    },
  };
}

export function addressAddFailure() {
  return {
    type: ADDRESS_ADD.FAILURE,
    payload: {

    },
  };
}

export function addressAddFetch(
  params
) {
  return {
    type: ADDRESS_ADD.REQUEST,
    payload: {
      ...params
    },
  };
}

export function addressRemoveSuccess() {
  return {
    type: ADDRESS_REMOVE.SUCCESS,
    payload: {

    },
  };
}

export function addressRemoveFailure() {
  return {
    type: ADDRESS_REMOVE.FAILURE,
    payload: {

    },
  };
}

export function addressRemoveFetch(
  adds
) {
  return {
    type: ADDRESS_REMOVE.REQUEST,
    payload: {
      adds,
    },
  };
}

export function addressModifySuccess() {
  return {
    type: ADDRESS_MODIFY.SUCCESS,
    payload: {

    },
  };
}

export function addressModifyFailure() {
  return {
    type: ADDRESS_MODIFY.FAILURE,
    payload: {

    },
  };
}

export function addressModifyFetch(
  item
) {
  return {
    type: ADDRESS_MODIFY.REQUEST,
    payload: {
      ...item,
      addrid: item.id,
      // isdefault: 'Y',
    },
  };
}
