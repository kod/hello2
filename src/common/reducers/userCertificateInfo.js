import { USER_CERTIFICATE_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  certUser: {
    
  },
};

export default function userCertificateInfo(state = initState, action) {
  switch (action.type) {
    case USER_CERTIFICATE_INFO.CLEAR:
      return {
        ...initState
      };
    case USER_CERTIFICATE_INFO.REQUEST:
      return {
        ...state,
        loading: true,
        funid: action.payload.user.result,
      };
    case USER_CERTIFICATE_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        certUser: action.payload.certUser,
      };
    case USER_CERTIFICATE_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
