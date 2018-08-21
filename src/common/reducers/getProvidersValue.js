import { GET_PROVIDERS_VALUE } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  recharge: [],
  phoneCard: {
    items: [],
    supCreditCard: null,
    // payWayButtons: [{text: '网银', payway: 2}],
  },
  scratchCards: {
    items: [],
    supCreditCard: null,
    // payWayButtons: [{text: '网银', payway: 2}],
  },
};

export default function getProvidersValue(state = initState, action) {
  switch (action.type) {
    case GET_PROVIDERS_VALUE.CLEAR:
      return {
        ...initState,
      };
    case GET_PROVIDERS_VALUE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROVIDERS_VALUE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        [action.payload.providerName]: {
          providerCode: action.payload.providerCode,
          items: action.payload.items,
          supCreditCard: action.payload.supCreditCard,
          // payWayButtons: action.payload.supCreditCard === 0 ? [{text: '网银', payway: 2}] : [{text: '信用卡', payway: 1}, {text: '网银', payway: 2}],
        },
      };
    case GET_PROVIDERS_VALUE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
