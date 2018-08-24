import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  topComputerFetchSuccess,
  topComputerFetchFailure,
} from '../actions/topComputer';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { TOP_COMPUTER } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* topComputerFetchWatchHandle() {
  try {
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.computer.topad';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const typeid = '2';
    const pagesize = '5';
    const currentpage = '1';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'typeid',
          value: typeid,
        },
        {
          key: 'pagesize',
          value: pagesize,
        },
        {
          key: 'currentpage',
          value: currentpage,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.initTopComputer, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        typeid,
        pagesize,
        currentpage,
      },
    ]);

    const computeradImgList = [];
    let classfyinfo = [];

    if (response.code === 10000) {
      const array = response.computerltopadinfo;
      for (let index = 0; index < array.length; index += 1) {
        const element = array[index];
        computeradImgList.push(element);
      }
      ({ classfyinfo } = response);
    }

    // yield put(topComputerFetchSuccess(response));
    yield put(topComputerFetchSuccess(computeradImgList, classfyinfo));
  } catch (err) {
    yield put(topComputerFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* topComputerFetchWatch() {
  yield takeEvery(TOP_COMPUTER.REQUEST, topComputerFetchWatchHandle);
}
