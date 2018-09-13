import { AUDIT_GET_INFO } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  identification: '',
  studentCard: '',
  personalPhotos: '',
};

export default function auditGetInfo(state = initState, action) {
  switch (action.type) {
    case AUDIT_GET_INFO.CLEAR:
      return {
        ...initState,
      };
    case AUDIT_GET_INFO.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUDIT_GET_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        identification: action.payload.identification,
        studentCard: action.payload.studentCard,
        personalPhotos: action.payload.personalPhotos,
      };
    case AUDIT_GET_INFO.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
