import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
// import { NavigationActions } from 'react-navigation';
import {
  getPhoneRechargeFetchSuccess,
  getPhoneRechargeFetchFailure,
} from '../actions/getPhoneRecharge';
import { prepaidFetch } from '../actions/prepaid';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_PHONE_RECHARGE } from '../constants/actionTypes';
import priceFormat from '../helpers/priceFormat';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import i18n from '../helpers/i18n';
import { MONETARY } from '../constants';

export function* getPhoneRechargeFetchWatchHandle(action) {
  try {
    const { msisdn } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.virtual.getPhoneRecharge';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'msisdn',
          value: msisdn,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getPhoneRecharge, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        msisdn,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getPhoneRechargeFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    if (!response.result.productInfos) {
      // 不支持直冲

      yield put(
        prepaidFetch({
          errorText: i18n.thisPhoneNumberNotSupportCharging,
          providerIcon: '',
        }),
      );
      yield put(getPhoneRechargeFetchFailure());
      // F.vue.recharge_fling = false;
      // F.vue.recharge_result = {};
      // F.vue.recharge_prepaid = F.def_recharge_prepaid;
      // F.vue.recharge_providerImg = '';
      // F.vue.recharge_selected = 0;

      // F.vue.telNumberError = true;
      // F.vue.telNumberErrorText = i18n.thisPhoneNumberNotSupportCharging;
      // F.vue.recharge_invalid = false;
    } else {
      // 支持直冲
      yield put(
        prepaidFetch({
          errorText: '',
          providerIcon: response.result.providerIcon,
          supCreditCard: response.result.supCreditCard,
        }),
      );
      yield put(
        getPhoneRechargeFetchSuccess({
          ...response.result,
          items: response.result.productInfos.map(val => {
            val.text = `${priceFormat(val.price)} ${MONETARY}`;
            return val;
          }),
        }),
      );

      // F.vue.recharge_fling = true;
      // F.vue.recharge_result = ret.result;
      // F.vue.recharge_prepaid = ret.result.productInfos;
      // F.vue.recharge_providerImg = ret.result.providerIcon;
      // F.vue.recharge_selected = 0;

      // F.vue.telNumberError = false;
      // F.vue.telNumberErrorText = '';
      // F.vue.recharge_invalid = true;
    }
  } catch (err) {
    yield put(getPhoneRechargeFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
  return true;
}

export function* getPhoneRechargeFetchWatch() {
  yield takeEvery(GET_PHONE_RECHARGE.REQUEST, getPhoneRechargeFetchWatchHandle);
}

// export function* getPhoneRechargeSuccessWatchHandle(action) {
//   try {
//     // const {
//     //   tradeNo,
//     //   orderNo,
//     // } = action.payload;

//   } catch (err) {

//   }
// }

// export function* getPhoneRechargeSuccessWatch() {
//   yield takeEvery(GET_PHONE_RECHARGE.SUCCESS, getPhoneRechargeSuccessWatchHandle);
// }
