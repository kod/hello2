import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from '../constants';
import { getPhoneRechargeFetchSuccess, getPhoneRechargeFetchFailure } from '../actions/getPhoneRecharge';
import { prepaidFetch } from '../actions/prepaid';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_PHONE_RECHARGE } from '../constants/actionTypes';
import priceFormat from "../helpers/priceFormat";
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

import NavigatorService from '../../navigations/NavigatorService';

export function* getPhoneRechargeFetchWatchHandle(action) {
  try {
    const {
      msisdn,
    } = action.payload;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.virtual.getPhoneRecharge';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signTypeMD5(appId, method, charset, Key, true);

    let encrypt = encryptMD5(
      [
        {
          key: 'msisdn',
          value: msisdn
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.getPhoneRecharge, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        msisdn: msisdn
      }
    ]);

    if (response.code !== 10000) {
      yield put(getPhoneRechargeFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    if (!response.result.productInfos) {
      // 不支持直冲

      yield put(prepaidFetch({
        errorText: 'Số điện thoại này không hỗ trợ nạp tiền',
        providerIcon: '',
      }));
      yield put(getPhoneRechargeFetchFailure());
      return false;
      // F.vue.recharge_fling = false;
      // F.vue.recharge_result = {};
      // F.vue.recharge_prepaid = F.def_recharge_prepaid;
      // F.vue.recharge_providerImg = '';
      // F.vue.recharge_selected = 0;

      // F.vue.telNumberError = true;
      // F.vue.telNumberErrorText = 'Số điện thoại này không hỗ trợ nạp tiền';
      // F.vue.recharge_invalid = false;
    } else {
      // 支持直冲

      yield put(prepaidFetch({
        errorText: '',
        providerIcon: response.result.providerIcon,
        supCreditCard: response.result.supCreditCard,
      }));

      // F.vue.recharge_fling = true;
      // F.vue.recharge_result = ret.result;
      // F.vue.recharge_prepaid = ret.result.productInfos;
      // F.vue.recharge_providerImg = ret.result.providerIcon;
      // F.vue.recharge_selected = 0;

      // F.vue.telNumberError = false;
      // F.vue.telNumberErrorText = '';
      // F.vue.recharge_invalid = true;
    }

    yield put(
      getPhoneRechargeFetchSuccess({
        ...response.result,
        items: response.result.productInfos.map((val, key) => {
          val.text = `${priceFormat(val.price)} ₫`;
          return val;
        }),
      })
    );
  } catch (err) {
    yield put(getPhoneRechargeFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getPhoneRechargeFetchWatch(res) {
  yield takeEvery(GET_PHONE_RECHARGE.REQUEST, getPhoneRechargeFetchWatchHandle);
}

export function* getPhoneRechargeSuccessWatchHandle(action) {
  try {
    // const {
    //   tradeNo,
    //   orderNo,
    // } = action.payload;

    // yield NavigatorService.navigate(SCREENS.Pay, {
    //   tradeNo,
    //   orderNo,
    // });

  } catch (err) {
    
  }
}

export function* getPhoneRechargeSuccessWatch() {
  yield takeEvery(GET_PHONE_RECHARGE.SUCCESS, getPhoneRechargeSuccessWatchHandle);
}
