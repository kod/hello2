import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  auditGetInfoFetchSuccess,
  auditGetInfoFetchFailure,
} from '../actions/auditGetInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { AUDIT_GET_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import { getAuthUserFunid } from '../selectors';

export function* auditGetInfoFetchWatchHandle() {
  const funid = yield select(getAuthUserFunid);
  try {
    const Key = 'riskKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.risk.getAuditInfo';
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
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.auditGetInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
      },
    ]);

    const { code, result } = response;

    if (code !== 10000) {
      yield put(auditGetInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        auditGetInfoFetchSuccess({
          ...result,
          // studentCard: '',
        }),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(auditGetInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* auditGetInfoFetchWatch() {
  yield takeEvery(AUDIT_GET_INFO.REQUEST, auditGetInfoFetchWatchHandle);
}
