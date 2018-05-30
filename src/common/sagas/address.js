import { Platform, ToastAndroid, } from 'react-native';
import { takeEvery, apply, put, select, } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SCREENS } from "../constants";
import {
  addressFetch,
  addressFetchSuccess,
  addressFetchFailure,
  addressAddSuccess,
  addressAddFailure,
  addressRemoveSuccess,
  addressRemoveFailure,
  addressModifySuccess,
  addressModifyFailure,
} from '../actions/address';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  ADDRESS,
  ADDRESS_ADD,
  ADDRESS_REMOVE,
  ADDRESS_MODIFY,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";
import i18n from '../helpers/i18n';

import { getAuthUserFunid, getAuthUserMsisdn } from '../selectors';

export function* addressFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const msisdn = yield select(getAuthUserMsisdn);

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.userviewaddr';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';
  
    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'msisdn',
          value: msisdn
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.userViewAddr, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        msisdn: msisdn,
      }
    ]);

    if (response.code !== 10000) {
      yield put(addressFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(addressFetchSuccess(response.details));
  } catch (err) {
    yield put(addressFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* addressAddFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);

    const {
      msisdn,
      address,
      isdefault,
      username,
      division1st = 1,
      division2nd = 0,
      division3rd = 0,
      division4th = 0,
      division5th = 0,
      division6th = 0,
    } = action.payload;

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.useraddaddr';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'msisdn',
          value: msisdn
        },
        {
          key: 'address',
          value: address
        },
        {
          key: 'isdefault',
          value: isdefault
        },
        {
          key: 'username',
          value: username
        },
        {
          key: 'division1st',
          value: division1st
        },
        {
          key: 'division2nd',
          value: division2nd
        },
        {
          key: 'division3rd',
          value: division3rd
        },
        {
          key: 'division4th',
          value: division4th
        },
        {
          key: 'division5th',
          value: division5th
        },
        {
          key: 'division6th',
          value: division6th
        },
      ],
      Key
    );
    
    // console.log(
    //   {
    //     appId: appId,
    //     method: method,
    //     charset: charset,
    //     signType: signType,
    //     encrypt: encrypt,
    //     timestamp: timestamp,
    //     version: version,
    //     funid: funid,
    //     msisdn: msisdn,
    //     address: address,
    //     isdefault: isdefault,
    //     username: username,
    //     division1st: division1st,
    //     division2nd: division2nd,
    //     division3rd: division3rd,
    //     division4th: division4th,
    //     division5th: division5th,
    //     division6th: division6th,
    //   }
    // );

    let response = yield apply(buyoo, buyoo.useraddaddr, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        msisdn: msisdn,
        address: address,
        isdefault: isdefault,
        username: username,
        division1st: division1st,
        division2nd: division2nd,
        division3rd: division3rd,
        division4th: division4th,
        division5th: division5th,
        division6th: division6th,
      }
    ]);
    // console.log(response);

    if (response.code !== 10000) {
      yield put(addressAddFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(addressAddSuccess());
  } catch (err) {
    yield put(addressAddFailure());
    yield put(addError(err.toString()));
  }
}

export function* addressAddSuccessWatchHandle() {
  try {
    yield put(addressFetch());
    if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
    // yield put(NavigationActions.back());
    // yield put(NavigationActions.navigate({ routeName: SCREENS.Address }));
  } catch (err) {
    
  }
}

export function* addressRemoveWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const adds = action.payload.adds;    

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.userDelAddrs';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'adds',
          value: adds
        },
      ],
      Key
    );

    let response = yield apply(buyoo, buyoo.userDelAddrs, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        adds: adds,
      }
    ]);

    if (response.code !== 10000) {
      yield put(addressRemoveFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(addressRemoveSuccess());
  } catch (err) {
    yield put(addressRemoveFailure());
    yield put(addError(err.toString()));
  }
}

export function* addressRemoveSuccessWatchHandle() {
  try {
    yield put(addressFetch());
  } catch (err) {
    
  }
}

export function* addressModifyWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);

    const {
      addrid,
      msisdn,
      address,
      isdefault,
      username,
      division1st = 1,
      division2nd = 0,
      division3rd = 0,
      division4th = 0,
      division5th = 0,
      division6th = 0,
    } = action.payload;
    
    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.usermodifyaddr';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'addrid',
          value: addrid
        },
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'msisdn',
          value: msisdn
        },
        {
          key: 'address',
          value: address
        },
        {
          key: 'isdefault',
          value: isdefault
        },
        {
          key: 'username',
          value: username
        },
        {
          key: 'division1st',
          value: division1st
        },
        {
          key: 'division2nd',
          value: division2nd
        },
        {
          key: 'division3rd',
          value: division3rd
        },
        {
          key: 'division4th',
          value: division4th
        },
        {
          key: 'division5th',
          value: division5th
        },
        {
          key: 'division6th',
          value: division6th
        },
      ],
      Key
    );
    
    let response = yield apply(buyoo, buyoo.userModifyAddr, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        addrid: addrid,
        funid: funid,
        msisdn: msisdn,
        address: address,
        isdefault: isdefault,
        username: username,
        division1st: division1st,
        division2nd: division2nd,
        division3rd: division3rd,
        division4th: division4th,
        division5th: division5th,
        division6th: division6th,
      }
    ]);

    if (response.code !== 10000) {
      yield put(addressModifyFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(addressModifySuccess());
  } catch (err) {
    yield put(addressModifyFailure());
    yield put(addError(err.toString()));
  }
}

export function* addressModifySuccessWatchHandle() {
  try {
    yield put(addressFetch(true));
    if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
  } catch (err) {
    
  }
}

export function* addressFetchWatch() {
  yield takeEvery(ADDRESS.REQUEST, addressFetchWatchHandle);
}

export function* addressAddFetchWatch() {
  yield takeEvery(ADDRESS_ADD.REQUEST, addressAddFetchWatchHandle);
}

export function* addressAddSuccessWatch() {
  yield takeEvery(ADDRESS_ADD.SUCCESS, addressAddSuccessWatchHandle);
}

export function* addressRemoveWatch() {
  yield takeEvery(ADDRESS_REMOVE.REQUEST, addressRemoveWatchHandle);
}

export function* addressRemoveSuccessWatch() {
  yield takeEvery(ADDRESS_REMOVE.SUCCESS, addressRemoveSuccessWatchHandle);
}

export function* addressModifyWatch() {
  yield takeEvery(ADDRESS_MODIFY.REQUEST, addressModifyWatchHandle);
}

export function* addressModifySuccessWatch() {
  yield takeEvery(ADDRESS_MODIFY.SUCCESS, addressModifySuccessWatchHandle);
}
