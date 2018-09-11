import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
// import moment from 'moment';
import {
  // modifyPayPasswordFetch,
  modifyPayPasswordFetchSuccess,
  modifyPayPasswordFetchFailure,
} from '../actions/modifyPayPassword';
import { cardQueryFetch } from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import { MODIFYPAYPASSWORD } from '../constants/actionTypes';
import { encryptMD5 } from '../../components/AuthEncrypt';

import { getAuthUserMsisdn } from '../selectors';

export function* modifyPayPasswordFetchWatchHandle(action) {
  try {
    const { otp, paypassword } = action.payload;
    const msisdn = yield select(getAuthUserMsisdn);

    const Key = 'userKey';
    const provider = Platform.OS === 'ios' ? '1' : '2';

    const encrypt = encryptMD5(
      [
        {
          key: 'provider',
          value: provider,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'paypassword',
          value: paypassword,
        },
        {
          key: 'otp',
          value: otp,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.modifyPayPassword, [
      {
        provider,
        msisdn,
        paypassword,
        otp,
        encryption: encrypt,
      },
    ]);

    switch (response.status) {
      case 10000:
        yield put(modifyPayPasswordFetchSuccess());
        return;

      case 70002:
        yield put(modifyPayPasswordFetchFailure());
        yield put(addError(i18n.verificationCodeIsIncorrect));
        return;

      default:
        yield put(modifyPayPasswordFetchFailure());
        yield put(addError('error'));

        break;
    }
  } catch (err) {
    yield put(modifyPayPasswordFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* modifyPayPasswordFetchWatch() {
  yield takeEvery(MODIFYPAYPASSWORD.REQUEST, modifyPayPasswordFetchWatchHandle);
}

export function* modifyPayPasswordSuccessWatchHandle() {
  try {
    yield put(cardQueryFetch());
  } catch (error) {
    yield put(addError(typeof err === 'string' ? error : error.toString()));
  }
}

export function* modifyPayPasswordSuccessWatch() {
  yield takeEvery(
    MODIFYPAYPASSWORD.SUCCESS,
    modifyPayPasswordSuccessWatchHandle,
  );
}
