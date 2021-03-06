import { Platform, Alert } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  receiveVoucherFetchSuccess,
  receiveVoucherFetchFailure,
} from '../actions/receiveVoucher';
import { getVoucherFetch } from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { RECEIVE_VOUCHER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

import i18n from '../helpers/i18n';

export function* receiveVoucherFetchWatchHandle(action) {
  try {
    const { voucherid } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.usercenter.receiveVoucher';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'voucherid',
          value: voucherid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.receiveVoucher, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        voucherid,
      },
    ]);

    if (response.code !== 10000) {
      yield put(receiveVoucherFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(receiveVoucherFetchSuccess());
    }
  } catch (err) {
    yield put(receiveVoucherFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* receiveVoucherFetchWatch() {
  yield takeEvery(RECEIVE_VOUCHER.REQUEST, receiveVoucherFetchWatchHandle);
}

export function* receiveVoucherSuccessWatchHandle() {
  try {
    yield put(getVoucherFetch());
    Alert.alert(
      '',
      i18n.success,
      [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ],
      // { cancelable: false },
    );
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* receiveVoucherSuccessWatch() {
  yield takeEvery(RECEIVE_VOUCHER.SUCCESS, receiveVoucherSuccessWatchHandle);
}
