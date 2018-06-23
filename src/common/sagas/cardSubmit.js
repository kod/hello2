import { Platform, Alert } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  cardSubmitFetch,
  cardSubmitFetchSuccess,
  cardSubmitFetchFailure,
} from '../actions/cardSubmit';
import {
  cardQueryFetch,
} from '../actions/cardQuery';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  CARD_SUBMIT,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

import NavigatorService from '../../navigations/NavigatorService';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

import i18n from '../helpers/i18n';

export function* cardSubmitFetchWatchHandle(action) {
  try {
    const {
      name,
    } = action.payload;
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.user.card.submit';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'name',
          value: name
        },
        {
          key: 'msisdn',
          value: msisdn
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.cardSubmit, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        name: name,
        msisdn: msisdn,
      }
    ]);

    if (response.code !== 10000) {
      yield put(cardSubmitFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(cardSubmitFetchSuccess());
  } catch (err) {
    yield put(cardSubmitFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}
export function* cardSubmitFetchWatch() {
  yield takeEvery(CARD_SUBMIT.REQUEST, cardSubmitFetchWatchHandle);
}

export function* cardSubmitSuccessWatchHandle() {
  try {
    yield put(cardQueryFetch());
    Alert.alert(
      '',
      '申请提交成功, 稍后会有校园大使与您联系',
      [
        {
          text: i18n.confirm,
          onPress: () => {
            NavigatorService.pop(1);
          },
        }
      ]
    )

  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cardSubmitSuccessWatch() {
  yield takeEvery(CARD_SUBMIT.SUCCESS, cardSubmitSuccessWatchHandle);
}
