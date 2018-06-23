import { Platform, Alert } from 'react-native';
import { normalize } from 'normalizr';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { productDetailInfoFetchSuccess, productDetailInfoFetchFailure } from '../actions/productDetailInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PRODUCT_DETAIL_INFO } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";
import NavigatorService from '../../navigations/NavigatorService';
import i18n from '../helpers/i18n';

export function* productDetailInfoFetchWatchHandle(action) {

  const get_propertiesIds = (propertiesIds, properties_detail) => {

    let result = {
      colorId: 0,
      versionId: 0,
    };

    propertiesIds = propertiesIds.split('-');
    propertiesIds.forEach((id1, key) => {
      properties_detail.forEach((val1, key1) => {
        const id2 = val1.id;
        if (parseInt(id1) !== id2) return false;
        if (val1.image) {
          result.colorId = id2;
          result.colorName = val1.value;
        } else {
          result.versionId = id2;
          result.versionName = val1.value;
        }
      })
    });
    return result;
  }

  const get_productDetail = (propertiesIdsResult, product_detail) => {
    let result = {};
    const propertiesArray = [];
    
    if (propertiesIdsResult.colorId) propertiesArray.push(propertiesIdsResult.colorId);
    if (propertiesIdsResult.versionId) propertiesArray.push(propertiesIdsResult.versionId);

    if (!propertiesArray.length) return {};

    return product_detail.filter((val, key) => {
      return propertiesArray.every((val1, key1) => {
        return val.propertiesIds.indexOf(val1 + '') !== -1;
      })
    })[0];

    // product_detail.forEach((val, key) => {
    //   const item = propertiesArray.every((val1, key1) => {
    //     return val.propertiesIds.indexOf(val1 + '') !== -1;
    //   })
    //   if (item) result = val;
    // });
    // return result;
  };

  const productDetailColorVersionList = (properties_detail) => {
    let result = {
      product_color: [],
      product_version: [],
    }

    properties_detail.forEach((val, key) => {
      if (val.image) {
        result.product_color.push(val);
      } else {
        result.product_version.push(val);
      }
    });
    return result;
  };
  
  const {
    brand_id,
  } = action.payload;
  let propertiesIds = action.payload.propertiesIds;

  try {
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.brand.query';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
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
      // yield put(addError(response.msg));
      Alert.alert(
        '',
        response.msg,
        [
          { 
            text: i18n.confirm, 
            onPress: () => { NavigatorService.pop(1); }
          }
        ]
      )

      return false;
    }

    const { properties_detail, brand_detail } = response;

    const product_detail = response.product_detail.map((val, key) => {
      val.imageUrls = val.imageUrls.split('|');
      val.goodsProperties = val.goodsProperties.split('|');
      return val;
    });

    propertiesIds = propertiesIds || product_detail[0].propertiesIds;
    
    const imageDesc = brand_detail.desc.split('|');
    
    const propertiesIdsResult = get_propertiesIds(propertiesIds, properties_detail)
    
    const productDetailResult = get_productDetail(propertiesIdsResult, product_detail);
    
    const productDetailColorVersionListResult = productDetailColorVersionList(properties_detail);

    yield put(productDetailInfoFetchSuccess(
      product_detail,
      productDetailResult,
      propertiesIdsResult,
      productDetailColorVersionListResult,
      imageDesc,
    ));

  } catch (err) {
    yield put(productDetailInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* productDetailInfoFetchWatch() {
  yield takeEvery(PRODUCT_DETAIL_INFO.REQUEST, productDetailInfoFetchWatchHandle);
}
