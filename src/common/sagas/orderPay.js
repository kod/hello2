import { Platform } from 'react-native';
import { takeEvery, apply, put, select, Alert } from 'redux-saga/effects';
import moment from 'moment';
import { SCREENS } from '../constants';
import {
  orderPayFetchSuccess,
  orderPayFetchFailure,
} from '../actions/orderPay';
import { cardQueryFetch } from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_PAY } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import i18n from '../helpers/i18n';
import { getAuthUserFunid } from '../selectors';

import NavigatorService from '../../navigations/NavigatorService';

export function* orderPayFetchWatchHandle(action) {
  try {
    const {
      BYtype = 'normal',
      tradeno,
      orderno,
      payway,
      paypassword = '',
      payvalue = 0,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'tradeKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.order.pay';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'tradeno',
          value: tradeno,
        },
        {
          key: 'orderno',
          value: orderno,
        },
        {
          key: 'payway',
          value: payway,
        },
        {
          key: 'paypassword',
          value: paypassword,
        },
        {
          key: 'payvalue',
          value: payvalue,
        },
      ],
      Key,
    );

    const options = [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        tradeno,
        orderno,
        payway,
        paypassword,
        payvalue,
      },
    ];

    if (payway !== 1) {
      NavigatorService.navigate(SCREENS.WebView, {
        source: buyoo.orderPayInternetBank(options[0]),
      });
      return false;
    }

    const response = yield apply(buyoo, buyoo.orderPay, options);

    if (response.code !== 10000) {
      yield put(orderPayFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        orderPayFetchSuccess({
          ret: response,
          BYtype,
        }),
      );
    }
  } catch (err) {
    yield put(orderPayFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
  return true;
}

export function* orderPayFetchWatch() {
  yield takeEvery(ORDER_PAY.REQUEST, orderPayFetchWatchHandle);
}

export function* orderPaySuccessWatchHandle(action) {
  try {
    const { BYtype } = action.payload;
    // yield NavigatorService.navigate(SCREENS.Pay, {
    //   tradeNo,
    //   orderNo,
    // });

    switch (BYtype) {
      case 'billPay':
        // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [
        //   SCREENS.Bill,
        //   ret,
        // ]);
        break;

      default:
        yield put(cardQueryFetch());
        Alert.alert('', i18n.successfulCopy, [
          // { text: i18n.cancel },
          {
            text: i18n.confirm,
            onPress: () => {
              NavigatorService.pop(3);
            },
          },
        ]);
        break;
    }
  } catch (err) {
    console.warn(err);
  }
}

export function* orderPaySuccessWatch() {
  yield takeEvery(ORDER_PAY.SUCCESS, orderPaySuccessWatchHandle);
}
