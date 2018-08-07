import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  adDigitalFetchSuccess,
  adDigitalFetchFailure,
} from '../actions/adDigital';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { AD_DIGITAL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* adDigitalFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.digital.ads';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const typeid = params.typeid || '5';
    const pagesize = params.pagesize || '8';
    const currentpage = params.currentpage || '1';

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

    const response = yield apply(buyoo, buyoo.initAdDigital, [
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

    const adDigitalList = [];
    const adDigitalBanerList = [];
    let classfyinfo = [];

    if (response.code === 10000) {
      const array = response.digitaladinfo;
      for (let index = 0; index < array.length; index += 1) {
        const element = array[index];
        if (element.position === 1) {
          adDigitalBanerList.push(element);
        }
        if (element.position === 3) {
          element.price = element.minprice;
          adDigitalList.push(element);
        }
      }
      // classfyinfo = response.classfyinfo;
      ({ classfyinfo } = response);
    }

    yield put(
      adDigitalFetchSuccess(adDigitalList, adDigitalBanerList, classfyinfo),
    );
  } catch (err) {
    yield put(adDigitalFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* adDigitalFetchWatch() {
  yield takeEvery(AD_DIGITAL.REQUEST, adDigitalFetchWatchHandle);
}
