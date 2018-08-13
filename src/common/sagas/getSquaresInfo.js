import { Platform } from 'react-native';
import {
  takeEvery,
  apply,
  put,
  // select,
  // select,
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

export function* getSquaresInfoFetchWatchHandle(action) {
  try {
    const {
      pagesize = 10,
      currentpage = 1,
      // currentpage = 1,
    } = action.payload;

    const funid = '';

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.index.squares';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '2.0';

    const signType = signTypeMD5(appId, method, charset, Key, true);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
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

    const response = yield apply(buyoo, buyoo.getSquaresInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        pagesize,
        currentpage,
      },
    ]);

    if (response.code !== 10000) {
      yield put(getSquaresInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(
        getSquaresInfoFetchSuccess({
          squareinfo: response.result.squareinfo,
          totalsize: response.result.totalsize,
          totalpage: response.result.totalpage,
          pagesize: response.result.pagesize,
          currentpage: response.result.currentpage,
        }),
      );
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
