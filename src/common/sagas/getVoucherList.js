import { Platform, Alert } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  // getVoucherListFetch,
  getVoucherListFetchSuccess,
  getVoucherListFetchFailure,
} from '../actions/getVoucherList';
import {
  getVoucherFetch,
  // getVoucherFetch,
} from '../actions/getVoucher';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  GET_VOUCHER_LIST,
  // GET_VOUCHER_LIST,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

import i18n from '../helpers/i18n';

export function* getVoucherListFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const {
      vouchertype = '',
      typeid = '',
      brandid = '',
      productid = '',
      cardno = '',
      status = '1',
      currentpage = '1',
      pagesize = '100',
    } = action.payload;

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.usercenter.getVoucher';
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
          key: 'vouchertype',
          value: vouchertype,
        },
        {
          key: 'typeid',
          value: typeid,
        },
        {
          key: 'brandid',
          value: brandid,
        },
        {
          key: 'productid',
          value: productid,
        },
        {
          key: 'cardno',
          value: cardno,
        },
        {
          key: 'status',
          value: status,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getVoucherList, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        vouchertype,
        typeid,
        brandid,
        productid,
        cardno,
        status,
        currentpage,
        pagesize,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getVoucherListFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getVoucherListFetchSuccess({
          items: response.details,
          status,
        }),
      );
    }
  } catch (err) {
    yield put(getVoucherListFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getVoucherListFetchWatch() {
  yield takeEvery(GET_VOUCHER_LIST.REQUEST, getVoucherListFetchWatchHandle);
}

export function* getVoucherListSuccessWatchHandle() {
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

export function* getVoucherListSuccessWatch() {
  yield takeEvery(GET_VOUCHER_LIST.SUCCESS, getVoucherListSuccessWatchHandle);
}
