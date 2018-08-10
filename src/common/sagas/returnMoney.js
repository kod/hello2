import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { returnMoneyFetchSuccess, returnMoneyFetchFailure } from '../actions/returnMoney';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { RETURN_MONEY } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import moment from 'moment';

export function* returnMoneyFetchWatchHandle(action) {
  try {
    const {
      totalamounts,
      payrate,
      repaymentmonths,
    } = action.payload;

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.returnMoney';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'totalamounts',
          value: totalamounts
        },
        {
          key: 'repaymentmonths',
          value: repaymentmonths
        },
        {
          key: 'payrate',
          value: payrate
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.returnMoney, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        totalamounts: totalamounts,
        repaymentmonths: repaymentmonths,
        payrate: payrate
      }
    ]);

    if (response.code !== 10000) {
      yield put(returnMoneyFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    yield put(returnMoneyFetchSuccess(response.details));
  } catch (err) {
    yield put(returnMoneyFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* returnMoneyFetchWatch() {
  yield takeEvery(RETURN_MONEY.REQUEST, returnMoneyFetchWatchHandle);
}
