import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  get3GProvidersCardFetchSuccess,
  get3GProvidersCardFetchFailure,
} from '../actions/get3GProvidersCard';
import { getProvidersValueFetch } from '../actions/getProvidersValue';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_3GPROVIDERS_CARD } from '../constants/actionTypes';
import { PROVIDER_TYPE_MAP } from '../constants';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* get3GProvidersCardFetchWatchHandle() {
  try {
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.virtual.getProvidersCard';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        // {
        //   key: 'msisdn',
        //   value: msisdn
        // },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.get3GProvidersCard, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
      },
    ]);

    if (response.code !== 10000) {
      yield put(get3GProvidersCardFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(get3GProvidersCardFetchSuccess(response.result));
    }
  } catch (err) {
    yield put(get3GProvidersCardFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* get3GProvidersCardFetchWatch() {
  yield takeEvery(
    GET_3GPROVIDERS_CARD.REQUEST,
    get3GProvidersCardFetchWatchHandle,
  );
}

export function* get3GProvidersCardSuccessWatchHandle(action) {
  try {
    const { items } = action.payload;

    yield put(
      getProvidersValueFetch({
        providerName: items[0].providerName,
        providerCode: items[0].providerCode,
        providerType: PROVIDER_TYPE_MAP.scratchCards,
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

export function* get3GProvidersCardSuccessWatch() {
  yield takeEvery(
    GET_3GPROVIDERS_CARD.SUCCESS,
    get3GProvidersCardSuccessWatchHandle,
  );
}
