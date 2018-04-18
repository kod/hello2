import { AD_DIGITAL } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  classfyinfo: [],
  adDigitalList: [],
  adDigitalBanerList: [],
};

export default function adDigital(state = initState, action) {
  switch (action.type) {
    case AD_DIGITAL.CLEAR:
      return {
        ...initState
      };
    case AD_DIGITAL.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AD_DIGITAL.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        adDigitalList: action.payload.adDigitalList,
        adDigitalBanerList: action.payload.adDigitalBanerList,
        classfyinfo: action.payload.classfyinfo,
      };
    case AD_DIGITAL.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
