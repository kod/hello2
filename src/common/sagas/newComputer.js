import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { newComputerFetchSuccess, newComputerFetchFailure } from '../actions/newComputer';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { NEW_COMPUTER } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* newComputerFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.computer.newest';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';

    let typeid = '2';
    let pagesize = '5';
    let currentpage = '1';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'typeid',
          value: typeid
        },
        {
          key: 'pagesize',
          value: pagesize
        },
        {
          key: 'currentpage',
          value: currentpage
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.initNewComputer, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        typeid: typeid,
        pagesize: pagesize,
        currentpage: currentpage
      }
    ]);

    let computernewList = [];
    let computernewBanerList = [];

    if (response.code === 10000) {
      const array = response.computernewest;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.position === 1) {
          computernewBanerList.push(element);
        }
        if (element.position === 3) {
          element.price = element.minprice;
          computernewList.push(element);
        }
      }
    }

    yield put(newComputerFetchSuccess(computernewList, computernewBanerList));
  } catch (err) {
    yield put(newComputerFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* newComputerFetchWatch() {
  yield takeEvery(NEW_COMPUTER.REQUEST, newComputerFetchWatchHandle);
}
