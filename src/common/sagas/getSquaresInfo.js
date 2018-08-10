import { Platform } from 'react-native';
import {
  takeEvery,
  apply,
  put,
  // select，
} from 'redux-saga/effects';
import moment from 'moment';
// import { NavigationActions } from 'react-navigation';
// import { SCREENS } from '../constants';
import {
  getSquaresInfoFetchSuccess,
  getSquaresInfoFetchFailure,
} from '../actions/getSquaresInfo';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { GET_SQUARES_INFO } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

// import NavigatorService from '../../navigations/NavigatorService';

export function* getSquaresInfoFetchWatchHandle(action) {
  try {
    const {
      msisdn,
      // msisdn,
    } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.virtual.getSquaresInfo';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'msisdn',
          value: msisdn,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.getSquaresInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        msisdn,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getSquaresInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(getSquaresInfoFetchSuccess());
    }
  } catch (err) {
    yield put(getSquaresInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* getSquaresInfoFetchWatch() {
  yield takeEvery(GET_SQUARES_INFO.REQUEST, getSquaresInfoFetchWatchHandle);
}

// export function* getSquaresInfoSuccessWatchHandle(action) {
//   try {
//     // const {
//     //   tradeNo,
//     //   orderNo,
//     // } = action.payload;

//     // yield NavigatorService.navigate(SCREENS.Pay, {
//     //   tradeNo,
//     //   orderNo,
//     // });

//   } catch (err) {

//   }
// }

// export function* getSquaresInfoSuccessWatch() {
//   yield takeEvery(GET_SQUARES_INFO.SUCCESS, getSquaresInfoSuccessWatchHandle);
// }
