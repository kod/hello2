import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from '../constants';
import { getProvidersCardFetchSuccess, getProvidersCardFetchFailure } from '../actions/getProvidersCard';
import { getProvidersValueFetch } from '../actions/getProvidersValue';
import { prepaidFetch } from '../actions/prepaid';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_PROVIDERS_CARD } from '../constants/actionTypes';
import { PROVIDER_TYPE_MAP } from '../constants';
import priceFormat from "../helpers/priceFormat";
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

import NavigatorService from '../../navigations/NavigatorService';

export function* getProvidersCardFetchWatchHandle(action) {
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

    let signType = signTypeMD5(appId, method, charset, Key, true);

    let encrypt = encryptMD5(
      [
        // {
        //   key: 'msisdn',
        //   value: msisdn
        // },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.getProvidersCard, [
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

    if (response.code !== 10000) {
      yield put(getProvidersCardFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(
      getProvidersCardFetchSuccess(response.result)
    );
  } catch (err) {
    yield put(getProvidersCardFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getProvidersCardFetchWatch(res) {
  yield takeEvery(GET_PROVIDERS_CARD.REQUEST, getProvidersCardFetchWatchHandle);
}

export function* getProvidersCardSuccessWatchHandle(action) {
  try {
    const { items } = action.payload;
    
    yield put(
      getProvidersValueFetch({
        providerName: items[0].providerName,
        providerCode: items[0].providerCode,
        providerType: PROVIDER_TYPE_MAP['phoneCard'],
      })  
    );
    
  } catch (err) {
    console.log(err);
  }
}

export function* getProvidersCardSuccessWatch() {
  yield takeEvery(GET_PROVIDERS_CARD.SUCCESS, getProvidersCardSuccessWatchHandle);
}
