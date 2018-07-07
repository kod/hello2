import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { getProvidersValueFetchSuccess, getProvidersValueFetchFailure } from '../actions/getProvidersValue';
import { prepaidFetch } from '../actions/prepaid';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_PROVIDERS_VALUE } from '../constants/actionTypes';
import { PROVIDER_TYPE_MAP } from "../constants";
import priceFormat from "../helpers/priceFormat";
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import NavigatorService from '../../navigations/NavigatorService';

export function* getProvidersValueFetchWatchHandle(action) {
  try {
    const {
      providerName,
      providerCode,
      providerType,
    } = action.payload;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.virtual.getProvidersValue';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.1';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'providerName',
          value: providerName
        },
        {
          key: 'providerCode',
          value: providerCode
        },
        {
          key: 'providerType',
          value: providerType
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.getProvidersValue, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        providerName: providerName,
        providerCode: providerCode,
        providerType: providerType
      }
    ]);

    if (response.code !== 10000) {
      yield put(getProvidersValueFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(
      getProvidersValueFetchSuccess({
        ...response.result,
        providerName: PROVIDER_TYPE_MAP[providerType],
        items: response.result.productInfos.map((val, key) => {
          val.text = `${priceFormat(val.price)} ₫`;
          return val;
        }),
      })
    );
  } catch (err) {
    yield put(getProvidersValueFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getProvidersValueFetchWatch(res) {
  yield takeEvery(GET_PROVIDERS_VALUE.REQUEST, getProvidersValueFetchWatchHandle);
}


export function* getProvidersValueSuccessWatchHandle(action) {
  try {
    // const { tradeNo, orderNo } = action.payload;
    // yield NavigatorService.navigate(SCREENS.Pay, {
    //   tradeNo,
    //   orderNo,
    // });
  } catch (err) {
    console.log(err);
  }
}

export function* getProvidersValueSuccessWatch() {
  yield takeEvery(GET_PROVIDERS_VALUE.SUCCESS, getProvidersValueSuccessWatchHandle);
}
