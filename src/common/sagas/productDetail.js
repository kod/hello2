// import { Platform, Alert } from 'react-native';
// import { normalize } from 'normalizr';
// import { takeEvery, apply, put } from 'redux-saga/effects';
// import { productDetailInfoFetchSuccess, productDetailInfoFetchFailure } from '../actions/productDetailInfo';
// import { addError } from '../actions/error';
// import buyoo from '../helpers/apiClient';
// import { PRODUCT_DETAIL_INFO } from '../constants/actionTypes';
// import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
// import moment from "moment";
// import Schemas from "../../common/constants/schemas";
// import NavigatorService from '../../navigations/NavigatorService';
// import i18n from '../helpers/i18n';

// export function* productDetailInfoFetchWatchHandle(action) {
//   const { brand_id } = action.payload;
//   try {
//     let Key = 'commodityKey';
//     let appId = Platform.OS === 'ios' ? '1' : '2';
//     let method = 'fun.brand.query';
//     let charset = 'utf-8';
//     let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
//     let version = '2.1';

//     let signType = signTypeMD5(appId, method, charset, Key, false);

//     let encrypt = encryptMD5(
//       [
//         {
//           key: 'brand_id',
//           value: brand_id
//         },
//       ],
//       Key
//     );

//     const response = yield apply(buyoo, buyoo.getProductDetailInfo, [
//       {
//         appId: appId,
//         method: method,
//         charset: charset,
//         signType: signType,
//         encrypt: encrypt,
//         timestamp: timestamp,
//         version: version,
//         brand_id: brand_id,
//       }
//     ]);

//     if (response.code !== 10000) {
//       yield put(productDetailInfoFetchFailure());
//       // yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
//       Alert.alert(
//         '',
//         response.msg,
//         [
//           { 
//             text: i18n.confirm, 
//             onPress: () => { NavigatorService.pop(1); }
//           }
//         ]
//       )
//       return false;
//     }

//     const { product_detail, properties_detail, brand_detail } = response;

//     response = {
//       ...brand_detail,
//       product_detail,
//       properties_detail,
//     }

//     // let edited = {
//     //   product_color: [],
//     //   product_version: [],
//     //   productDetailJson: {},
//     //   propertiesIds: '',
//     // };

//     // edited.propertiesIds = product_detail[0] ? product_detail[0].propertiesIds : '';

//     // edited.productDetailJson = product_detail.reduce((a, b, index) => {
//     //   if (index === 1) {
//     //       return {
//     //           [a.propertiesIds]: a,
//     //           [b.propertiesIds]: b,
//     //       }
//     //   } else {
//     //       return {
//     //           ...a,
//     //           [b.propertiesIds]: b,
//     //       }
//     //   }
//     // });

//     const normalized = normalize(
//       response, 
//       Schemas.PRODUCTDETAIL,
//     );

//     yield put(productDetailInfoFetchSuccess(
//       normalized.entities,
//       normalized.result,
//       brand_id,
//     ));
//   } catch (err) {
//     yield put(productDetailInfoFetchFailure());
//     yield put(addError(typeof err === 'string' ? err : err.toString()));
//   }
// }

// export function* productDetailInfoFetchWatch() {
//   yield takeEvery(PRODUCT_DETAIL_INFO.REQUEST, productDetailInfoFetchWatchHandle);
// }
