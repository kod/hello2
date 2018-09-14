import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import moment from 'moment';
import {
  mergeGetDetailFetchSuccess,
  mergeGetDetailFetchFailure,
} from '../actions/mergeGetDetail';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { MERGE_GETDETAIL } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

export function* mergeGetDetailFetchWatchHandle(action) {
  const getPropertiesIds = (propertiesIds, propertiesDetail) => {
    const result = {
      colorId: 0,
      versionId: 0,
    };

    propertiesIds = propertiesIds.split('-');
    propertiesIds.forEach(id1 => {
      propertiesDetail.forEach(val1 => {
        const id2 = val1.id;
        if (parseInt(id1, 10) !== id2) return false;
        if (val1.image) {
          result.colorId = id2;
          result.colorName = val1.value;
        } else {
          result.versionId = id2;
          result.versionName = val1.value;
        }
        return false;
      });
    });
    return result;
  };

  const getProductDetail = (propertiesIdsResult, productDetail) => {
    const propertiesArray = [];

    if (propertiesIdsResult.colorId)
      propertiesArray.push(propertiesIdsResult.colorId);
    if (propertiesIdsResult.versionId)
      propertiesArray.push(propertiesIdsResult.versionId);

    if (!propertiesArray.length) return {};

    return productDetail.filter(val =>
      propertiesArray.every(
        val1 => val.propertiesIds.indexOf(`${val1}`) !== -1,
      ),
    )[0];
  };

  try {
    const { brandid } = action.payload;
    let { propertiesIds } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.merge.detail';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'brandid',
          value: brandid,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.mergeGetDetail, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        brandid,
      },
    ]);

    if (response.code !== 10000) {
      yield put(mergeGetDetailFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      const { propertydetails, branddetails } = response;

      const productdetails = response.productdetails.map(val => {
        val.imageUrls = val.imageUrls.split('|').map(val1 => {
          const result = {};
          result.imageUrl = val1;
          return result;
        });
        val.goodsProperties = val.goodsProperties.split('|');
        return val;
      });

      propertiesIds = propertiesIds || productdetails[0].propertiesIds;

      const imageDesc = branddetails.desc.split('|');

      const propertiesIdsResult = getPropertiesIds(
        propertiesIds,
        propertydetails,
      );

      const productDetailResult = getProductDetail(
        propertiesIdsResult,
        productdetails,
      );

      yield put(
        mergeGetDetailFetchSuccess(
          productdetails,
          productDetailResult,
          propertiesIdsResult,
          imageDesc,
        ),
      );
    }
  } catch (err) {
    yield put(mergeGetDetailFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* mergeGetDetailFetchWatch() {
  yield takeEvery(MERGE_GETDETAIL.REQUEST, mergeGetDetailFetchWatchHandle);
}
