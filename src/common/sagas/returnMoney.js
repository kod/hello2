import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { returnMoneyFetchSuccess, returnMoneyFetchFailure } from '../actions/returnMoney';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { RETURN_MONEY } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* returnMoneyFetchWatchHandle(action) {
  try {
    const {
      totalamounts,
      payrate,
      repaymentmonths,
    } = action.payload;

    let Key = 'settleKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.trade.returnMoney';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
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
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        totalamounts: totalamounts,
        repaymentmonths: repaymentmonths,
        payrate: payrate
      }
    ]);

    if (response.code !== 10000) {
      yield put(returnMoneyFetchFailure());
      yield put(addError(response.msg));
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
