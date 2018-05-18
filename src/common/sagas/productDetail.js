import { Platform } from 'react-native';
import { normalize } from 'normalizr';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { productDetailInfoFetchSuccess, productDetailInfoFetchFailure } from '../actions/productDetailInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PRODUCT_DETAIL_INFO } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";
import Schemas from "../../common/constants/schemas";

export function* productDetailInfoFetchWatchHandle(action) {
  const { brand_id } = action.payload;
  try {
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.brand.query';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.1';

    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'brand_id',
          value: brand_id
        },
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.getProductDetailInfo, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        brand_id: brand_id,
      }
    ]);

    if (response.code !== 10000) {
      yield put(productDetailInfoFetchFailure());
      yield put(addError(response.msg));
      return false;
    }

    const { product_detail, properties_detail, brand_detail } = response;

    response = {
      ...brand_detail,
      product_detail,
      properties_detail,
    }

    // let edited = {
    //   product_color: [],
    //   product_version: [],
    //   productDetailJson: {},
    //   propertiesIds: '',
    // };

    // edited.propertiesIds = product_detail[0] ? product_detail[0].propertiesIds : '';

    // edited.productDetailJson = product_detail.reduce((a, b, index) => {
    //   if (index === 1) {
    //       return {
    //           [a.propertiesIds]: a,
    //           [b.propertiesIds]: b,
    //       }
    //   } else {
    //       return {
    //           ...a,
    //           [b.propertiesIds]: b,
    //       }
    //   }
    // });

    const normalized = normalize(
      response, 
      Schemas.PRODUCTDETAIL,
    );

    yield put(productDetailInfoFetchSuccess(
      normalized.entities,
      normalized.result,
      brand_id,
    ));
  } catch (err) {
    yield put(productDetailInfoFetchFailure());
    yield put(addError(err.toString()));
  }
}

export function* productDetailInfoFetchWatch() {
  yield takeEvery(PRODUCT_DETAIL_INFO.REQUEST, productDetailInfoFetchWatchHandle);
}
