import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  getProvidersValueFetchSuccess,
  getProvidersValueFetchFailure,
} from '../actions/getProvidersValue';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_PROVIDERS_VALUE } from '../constants/actionTypes';
import { PROVIDER_TYPE_MAP, MONETARY } from '../constants';
import priceFormat from '../helpers/priceFormat';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* getProvidersValueFetchWatchHandle(action) {
  try {
    const { providerName, providerCode, providerType } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.virtual.getProvidersValue';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.1';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'providerName',
          value: providerName,
        },
        {
          key: 'providerCode',
          value: providerCode,
        },
        {
          key: 'providerType',
          value: providerType,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getProvidersValue, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        providerName,
        providerCode,
        providerType,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getProvidersValueFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getProvidersValueFetchSuccess({
          ...response.result,
          providerName: PROVIDER_TYPE_MAP[providerType],
          items: response.result.productInfos.map(val => {
            val.text = `${priceFormat(val.price)} ${MONETARY}`;
            return val;
          }),
        }),
      );
    }
  } catch (err) {
    yield put(getProvidersValueFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getProvidersValueFetchWatch() {
  yield takeEvery(
    GET_PROVIDERS_VALUE.REQUEST,
    getProvidersValueFetchWatchHandle,
  );
}
