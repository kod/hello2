import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  createNormalOrderFetchSuccess,
  createNormalOrderFetchFailure,
} from '../actions/createNormalOrder';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { CREATE_NORMAL_ORDER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* createNormalOrderFetchWatchHandle(action) {
  const funid = yield select(getAuthUserFunid);

  try {
    const {
      orderNo,
      totalAmount,
      currency,
      subject,
      repaymentMonth,
      goodsDetail,
      timeoutExpress,
      notifyUrlBg,
      orderNo1,
      tradeNo1,
    } = action.payload;

    const Key = 'tradeKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.trade.createnormal';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'orderNo',
          value: orderNo,
        },
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'totalAmount',
          value: totalAmount,
        },
        {
          key: 'currency',
          value: currency,
        },
        {
          key: 'subject',
          value: subject,
        },
        {
          key: 'repaymentMonth',
          value: repaymentMonth,
        },
        {
          key: 'goodsDetail',
          value: goodsDetail,
        },
        {
          key: 'timeoutExpress',
          value: timeoutExpress,
        },
        {
          key: 'orderNo1',
          value: orderNo1,
        },
        {
          key: 'tradeNo1',
          value: tradeNo1,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.createNormalOrder, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        notifyUrlBg,
        orderNo,
        funid,
        totalAmount,
        currency,
        subject,
        repaymentMonth,
        goodsDetail,
        timeoutExpress,
        orderNo1,
        tradeNo1,
      },
    ]);
    console.log(response);

    if (response.code !== 10000) {
      yield put(createNormalOrderFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        createNormalOrderFetchSuccess({}),
      );
    }
  } catch (err) {
    yield put(createNormalOrderFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* createNormalOrderFetchWatch() {
  yield takeEvery(
    CREATE_NORMAL_ORDER.REQUEST,
    createNormalOrderFetchWatchHandle,
  );
}
