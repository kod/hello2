import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { mergeGetDetailFetchSuccess, mergeGetDetailFetchFailure } from '../actions/mergeGetDetail';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETDETAIL } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";


export function* mergeGetDetailFetchWatchHandle(action) {

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
  
  try {
    const { brandid } = action.payload;
    let propertiesIds = action.payload.propertiesIds;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.merge.detail';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '2.0';
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'brandid',
          value: brandid
        }
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.mergeGetDetail, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        brandid: brandid,
      }
    ]);

    if (response.code !== 10000) {
      yield put(mergeGetDetailFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
      return false;
    }

    const { propertydetails, branddetails } = response;

    const productdetails = response.productdetails.map((val, key) => {
      val.imageUrls = val.imageUrls.split('|').map((val, key) => {
        const result = {}
        result.imageUrl = val;
        return result;
      });
      val.goodsProperties = val.goodsProperties.split('|');
      return val;
    });

    propertiesIds = propertiesIds || productdetails[0].propertiesIds;
    
    const imageDesc = branddetails.desc.split('|');
    
    const propertiesIdsResult = get_propertiesIds(propertiesIds, propertydetails)
    
    const productDetailResult = get_productDetail(propertiesIdsResult, productdetails);
    
    const productDetailColorVersionListResult = productDetailColorVersionList(propertydetails);

    yield put(mergeGetDetailFetchSuccess(
      productdetails,
      productDetailResult,
      propertiesIdsResult,
      productDetailColorVersionListResult,
      imageDesc,
    ));
  } catch (err) {
    yield put(mergeGetDetailFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetDetailFetchWatch() {
  yield takeEvery(MERGE_GETDETAIL.REQUEST, mergeGetDetailFetchWatchHandle);
}
