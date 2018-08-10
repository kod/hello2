import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from '../constants';
import { orderPayFetchSuccess, orderPayFetchFailure } from '../actions/orderPay';
import {
  cardQueryFetch,
} from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_PAY } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

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
          value: tradeno
        },
        {
          key: 'orderno',
          value: orderno
        },
        {
          key: 'payway',
          value: payway
        },
        {
          key: 'paypassword',
          value: paypassword
        },
        {
          key: 'payvalue',
          value: payvalue
        },
      ],
      Key
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
        tradeno: tradeno,
        orderno: orderno,
        payway: payway,
        paypassword: paypassword,
        payvalue: payvalue,
      }
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
      return false;
    }

    yield put(orderPayFetchSuccess({
      ret: response,
      BYtype,
    }));
  } catch (err) {
    yield put(orderPayFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* orderPayFetchWatch(res) {
  yield takeEvery(ORDER_PAY.REQUEST, orderPayFetchWatchHandle);
}


export function* orderPaySuccessWatchHandle(action) {
  try {
    const {
      BYtype,
      ret,
    } = action.payload;
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
        Alert.alert(
          '',
          '支付成功',
          [
            // { text: i18n.cancel, },
            { 
              text: i18n.confirm, 
              onPress: () => {
                NavigatorService.pop(3);
              }
            }
          ]
        )
        break;
    }


  } catch (err) {
    
  }
}

export function* orderPaySuccessWatch() {
  yield takeEvery(ORDER_PAY.SUCCESS, orderPaySuccessWatchHandle);
}
