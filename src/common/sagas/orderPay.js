import {
  Platform,
  // Alert,
  DeviceEventEmitter,
} from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import { SCREENS, CREDIT_PAYWAY } from '../constants';
import {
  orderPayFetchSuccess,
  orderPayFetchFailure,
} from '../actions/orderPay';
// import { cardQueryFetch } from '../actions/cardQuery';
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
      payrate = 100,
      repaymentmonth = 0,
      payvalue = 0,
      screen = '',
    } = action.payload;
    console.log(action.payload);
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
          key: 'payrate',
          value: payrate,
        },
        {
          key: 'repaymentmonth',
          value: repaymentmonth,
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
        payrate,
        repaymentmonth,
        payvalue,
      },
    ];

    if (payway !== CREDIT_PAYWAY) {
      yield put(orderPayFetchFailure());
      NavigatorService.navigate(SCREENS.WebView, {
        source: buyoo.orderPayInternetBank(options[0]),
        from: SCREENS.Pay,
      });
      return false;
    }

    const response = yield apply(buyoo, buyoo.orderPay, options);

    if (response.code !== 10000) {
      yield put(orderPayFetchFailure());
      switch (response.code) {
        case 60051:
          yield put(addError(i18n.cardPasswordError));
          break;

        default:
          yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
          break;
      }
    } else {
      yield put(
        orderPayFetchSuccess({
          ret: response,
          BYtype,
          screen,
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
    const { screen } = action.payload;
    yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [screen]);
    // switch (screen) {
    //   case 'billPay':
    //     // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [
    //     //   SCREENS.Bill,
    //     //   ret,
    //     // ]);
    //     break;

    //   default:
    //     yield put(cardQueryFetch());
    //     Alert.alert('', i18n.successfulCopy, [
    //       // { text: i18n.cancel },
    //       {
    //         text: i18n.confirm,
    //         onPress: () => {
    //           NavigatorService.pop(3);
    //         },
    //       },
    //     ]);
    //     break;
    // }
  } catch (err) {
    console.warn(err);
  }
}

export function* orderPaySuccessWatch() {
  yield takeEvery(ORDER_PAY.SUCCESS, orderPaySuccessWatchHandle);
}
