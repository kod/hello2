import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { adDigitalFetchSuccess, adDigitalFetchFailure } from '../actions/adDigital';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { AD_DIGITAL } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";

export function* adDigitalFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.digital.ads';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '1.0';

    let typeid = params.typeid || '5';
    let pagesize = params.pagesize || '8';
    let currentpage = params.currentpage || '1';

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

    const response = yield apply(buyoo, buyoo.initAdDigital, [
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


    let adDigitalList = [];
    let adDigitalBanerList = [];
    let classfyinfo = [];

    if (response.code === 10000) {
      const array = response.digitaladinfo;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.position === 1) {
          adDigitalBanerList.push(element);
        }
        if (element.position === 3) {
          element.price = element.minprice;
          adDigitalList.push(element);
        }
      }
      classfyinfo = response.classfyinfo;
    }

    yield put(adDigitalFetchSuccess(adDigitalList, adDigitalBanerList, classfyinfo));
  } catch (err) {
    yield put(adDigitalFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* adDigitalFetchWatch() {
  yield takeEvery(AD_DIGITAL.REQUEST, adDigitalFetchWatchHandle);
}
