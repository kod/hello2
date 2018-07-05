import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import { get3GProvidersCardFetchSuccess, get3GProvidersCardFetchFailure } from '../actions/get3GProvidersCard';
import { getProvidersValueFetch } from '../actions/getProvidersValue';
import { prepaidFetch } from '../actions/prepaid';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_3GPROVIDERS_CARD } from '../constants/actionTypes';
import { PROVIDER_TYPE_MAP } from "../constants";
import priceFormat from "../helpers/priceFormat";
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import NavigatorService from '../../navigations/NavigatorService';

export function* get3GProvidersCardFetchWatchHandle(action) {
  try {
    // const {
    //   msisdn,
    // } = action.payload;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.virtual.getProvidersCard';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        // {
        //   key: 'msisdn',
        //   value: msisdn
        // },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.get3GProvidersCard, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
      }
    ]);

    console.log(response);

    if (response.code !== 10000) {
      yield put(get3GProvidersCardFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(
      get3GProvidersCardFetchSuccess(response.result)
    );
  } catch (err) {
    yield put(get3GProvidersCardFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* get3GProvidersCardFetchWatch(res) {
  yield takeEvery(GET_3GPROVIDERS_CARD.REQUEST, get3GProvidersCardFetchWatchHandle);
}

export function* get3GProvidersCardSuccessWatchHandle(action) {
  try {
    const { items } = action.payload;
    
    yield put(
      getProvidersValueFetch({
        providerName: items[0].providerName,
        providerCode: items[0].providerCode,
        providerType: PROVIDER_TYPE_MAP['scratchCards'],
      })  
    );
    
  } catch (err) {
    console.log(err);
  }
}

export function* get3GProvidersCardSuccessWatch() {
  yield takeEvery(GET_3GPROVIDERS_CARD.SUCCESS, get3GProvidersCardSuccessWatchHandle);
}
