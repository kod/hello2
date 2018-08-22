/* eslint-disable camelcase */
import { Platform, DeviceEventEmitter } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  addEvaluationFetchSuccess,
  addEvaluationFetchFailure,
} from '../actions/addEvaluation';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { ADD_EVALUATION } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

export function* addEvaluationFetchWatchHandle(action) {
  const msisdn = yield select(getAuthUserMsisdn);
  const funid = yield select(getAuthUserFunid);
  try {
    const { trade_no, order_no, comments, screen } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.evaluation.add';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
        {
          key: 'username',
          value: msisdn,
        },
        {
          key: 'trade_no',
          value: trade_no,
        },
        {
          key: 'order_no',
          value: order_no,
        },
        {
          key: 'comments',
          value: comments,
        },
      ],
      Key,
    );

    console.log({
      appId,
      method,
      charset,
      signType,
      encrypt,
      timestamp,
      version,
      funid,
      msisdn,
      username: msisdn,
      trade_no,
      order_no,
      comments,
    });

    const response = yield apply(buyoo, buyoo.addEvaluation, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
        username: msisdn,
        trade_no,
        order_no,
        comments,
      },
    ]);

    if (response.code !== 10000) {
      yield put(addEvaluationFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(addEvaluationFetchSuccess());
      yield apply(DeviceEventEmitter, DeviceEventEmitter.emit, [screen]);
    }
  } catch (err) {
    yield put(addEvaluationFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* addEvaluationFetchWatch() {
  yield takeEvery(ADD_EVALUATION.REQUEST, addEvaluationFetchWatchHandle);
}
