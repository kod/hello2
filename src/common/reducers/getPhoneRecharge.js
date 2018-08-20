import { GET_PHONE_RECHARGE } from '../constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  items: [
    {
      text: '10,000 ₫',
      price: 10000,
      orgPrice: 10000,
    },
    {
      text: '20,000 ₫',
      price: 20000,
      orgPrice: 20000,
    },
    {
      text: '30,000 ₫',
      price: 30000,
      orgPrice: 30000,
    },
  ],
  payWayButtons: [
    {
      text: '网银',
      payway: 2,
    },
  ],
};

export default function getPhoneRecharge(state = initState, action) {
  switch (action.type) {
    case GET_PHONE_RECHARGE.CLEAR:
      return {
        ...initState,
      };
    case GET_PHONE_RECHARGE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PHONE_RECHARGE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.items,
        providerCode: action.payload.providerCode,
        payWayButtons:
          action.payload.supCreditCard === 0
            ? [{ text: '网银', payway: 2 }]
            : [{ text: '信用卡', payway: 1 }, { text: '网银', payway: 2 }],
      };
    case GET_PHONE_RECHARGE.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
