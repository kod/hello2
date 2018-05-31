import { Platform, ToastAndroid, } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  modifyPayPasswordFetch,
  modifyPayPasswordFetchSuccess,
  modifyPayPasswordFetchFailure,
} from '../actions/modifyPayPassword';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import {
  MODIFYPAYPASSWORD,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";


export function* modifyPayPasswordFetchWatchHandle(action) {
  try {
    const {
      msisdn,
      otp,
      paypassword,
    } = action.payload;
    
    const Key = 'userKey';
    const provider = Platform.OS === 'ios' ? '1' : '2';
  
    const encrypt = encrypt_MD5(
      [
        {
          key: 'provider',
          value: provider
        },
        {
          key: 'msisdn',
          value: msisdn
        },
        {
          key: 'paypassword',
          value: paypassword
        },
        {
          key: 'otp',
          value: otp
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.modifyPayPassword, [
      {
        provider: provider,
        msisdn: msisdn,
        paypassword: paypassword,
        otp: otp,
        encryption: encrypt
      }
    ]);

    console.log(response);

    switch (response.status) {
      case 10000:
        yield put(modifyPayPasswordFetchSuccess());
        if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
      return;
    
      case 70002:
        yield put(modifyPayPasswordFetchFailure());
        yield put(addError('Mã xác nhận SMS không đúng'));
        return;
    
      default:
        yield put(modifyPayPasswordFetchFailure());
        yield put(addError('error'));

        break;
    }

  } catch (err) {
    yield put(modifyPayPasswordFetchFailure());
    yield put(addError(err.toString()));
  }
}
export function* modifyPayPasswordFetchWatch() {
  yield takeEvery(MODIFYPAYPASSWORD.REQUEST, modifyPayPasswordFetchWatchHandle);
}
