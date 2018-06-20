import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { orderPayFetchSuccess, orderPayFetchFailure } from '../actions/orderPay';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ORDER_PAY } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

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

    let Key = 'tradeKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.order.pay';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
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

    console.log(JSON.stringify({
      appid: appId,
      method: method,
      charset: charset,
      signtype: signType,
      encrypt: encrypt,
      timestamp: timestamp,
      version: version,
      funid: funid,
      tradeno: tradeno,
      orderno: orderno,
      payway: payway,
      paypassword: paypassword,
      payvalue: payvalue,
    }));

    const options = [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        tradeno: tradeno,
        orderno: orderno,
        payway: payway,
        paypassword: paypassword,
        payvalue: payvalue,
      }
    ];

    if (payway !== 1) {
      console.log(buyoo.orderPayInternetBank(options[0]) + '');
      NavigatorService.navigate(SCREENS.WebView, {
        source: buyoo.orderPayInternetBank(options[0]),
      });
      return false;
    }

    const response = yield apply(buyoo, buyoo.orderPay, options);

    console.log(response);
    console.log(JSON.stringify(response));

    if (response.code !== 10000) {
      yield put(orderPayFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(orderPayFetchSuccess({
      ret: response,
      BYtype,
    }));
  } catch (err) {
    console.log(err);
    yield put(orderPayFetchFailure());
    yield put(addError(err.toString()));
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
    // Alert.alert(
    //   '',
    //   '支付成功',
    //   [
    //     // { text: i18n.cancel, },
    //     { 
    //       text: '确定', 
    //       onPress: () => {
    //         // 根据入口。刷新及返回到相应页面
    //       }
    //     }
    //   ]
    // )

    switch (BYtype) {
      case 'billPay':
        // yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [ 'billPayResult', ret]);
        break;
    
      default:
        break;
    }


  } catch (err) {
    
  }
}

export function* orderPaySuccessWatch() {
  yield takeEvery(ORDER_PAY.SUCCESS, orderPaySuccessWatchHandle);
}
