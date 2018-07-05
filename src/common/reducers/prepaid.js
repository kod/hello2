import {
  PREPAID,
} from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  errorText: '',
  providerIcon: '',
};

export default function prepaid(state = initState, action) {
  switch (action.type) {
    // case PREPAID.CLEAR:
    //   return {
    //     ...initState
    //   };
    case PREPAID.REQUEST:
      return {
        ...state,
        loading: true,
        errorText: action.payload.errorText,
        providerIcon: action.payload.providerIcon,
      };
    // case PREPAID.SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     item: action.payload.item,
    //   };
    // case PREPAID.FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //   };
    default:
      return state;
  }
}
