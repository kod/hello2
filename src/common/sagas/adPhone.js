import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { adPhoneFetchSuccess, adPhoneFetchFailure } from '../actions/adPhone';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { AD_PHONE } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* adPhoneFetchWatchHandle(action) {
  try {
    const { params = {} } = action.payload;
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.cellphone.ads';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';

    let typeid = params.typeid || '1';
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

    const response = yield apply(buyoo, buyoo.initAdCellphone, [
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


    let phoneAdList = [];
    let phoneAdBanerList = [];
    let classfyinfo = [];

    if (response.code === 10000) {
      const array = response.cellphoneadinfo;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.position === 1) {
          phoneAdBanerList.push(element);
        }
        if (element.position === 3) {
          element.price = element.minprice;
          phoneAdList.push(element);
        }
      }
      classfyinfo = response.classfyinfo;
    }

    yield put(adPhoneFetchSuccess(phoneAdList, phoneAdBanerList, classfyinfo));
  } catch (err) {
    yield put(adPhoneFetchFailure());
    yield put(addError(err));
  }
}

export function* adPhoneFetchWatch() {
  yield takeEvery(AD_PHONE.REQUEST, adPhoneFetchWatchHandle);
}
