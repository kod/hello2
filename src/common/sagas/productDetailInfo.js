/* eslint-disable camelcase */
import { Platform } from 'react-native';
// import { normalize } from 'normalizr';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  productDetailInfoFetchSuccess,
  productDetailInfoFetchFailure,
} from '../actions/productDetailInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { PRODUCT_DETAIL_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* productDetailInfoFetchWatchHandle(action) {
  // 获取默认显示商品(库存不为0)
  const getProductDetail = data => {
    let productDetailResult = {};
    let propertiesIdsResult = '';

    Object.keys(data).forEach(val => {
      if (propertiesIdsResult === '' && data[val].numbers > 0) {
        productDetailResult = data[val];
        propertiesIdsResult = val;
      }
    });

    return {
      productDetailResult,
      propertiesIdsResult,
    };
  };

  // 属性归类
  const makePropertiesDetail = array => {
    const propertiesArray = [];
    const propertiesObject = {};
    const propertiesObjectForId = {};
    array.forEach(val => {
      if (propertiesArray.indexOf(val.name) === -1)
        propertiesArray.push(val.name);

      propertiesObjectForId[val.id] = val;
      if (propertiesObject[val.name]) {
        // 已存在
        propertiesObject[val.name].push(val);
      } else {
        // 不存在
        propertiesObject[val.name] = [];
        propertiesObject[val.name].push(val);
      }
    });
    return {
      propertiesArray: propertiesArray.sort(),
      propertiesObject,
      propertiesObjectForId,
    };
  };

  // 商品归类
  const roductDetailForPropertiesIds = array => {
    const result = {};
    array.forEach(val => {
      // // 库存大于0才加入列表
      // if (val.numbers > 0)
      result[
        val.propertiesIds
          .split('-')
          .sort()
          .join('-')
      ] = val;
    });
    return result;
  };

  const { brand_id } = action.payload;

  try {
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.brand.query';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.1';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'brand_id',
          value: brand_id,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getProductDetailInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        brand_id,
      },
    ]);

    if (response.code !== 10000) {
      yield put(productDetailInfoFetchFailure(response.msg));
    } else {
      const { properties_detail, brand_detail } = response;

      const product_detail = response.product_detail.map(val => {
        val.imageUrls = val.imageUrls.split('|').map(val1 => {
          const result = {};
          result.imageUrl = val1;
          return result;
        });
        val.goodsProperties = val.goodsProperties.split('|');
        return val;
      });

      const imageDesc = brand_detail.desc.split('|');

      const productDetailSort = roductDetailForPropertiesIds(product_detail);

      yield put(
        productDetailInfoFetchSuccess({
          product_detail,
          imageDesc,
          ...getProductDetail(productDetailSort),
          ...makePropertiesDetail(properties_detail),
          productDetailSort,
        }),
      );
    }
  } catch (err) {
    yield put(productDetailInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* productDetailInfoFetchWatch() {
  yield takeEvery(
    PRODUCT_DETAIL_INFO.REQUEST,
    productDetailInfoFetchWatchHandle,
  );
}
