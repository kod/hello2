import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
// import { SCREENS } from '../constants';
import {
  billByYearFetchSuccess,
  billByYearFetchFailure,
} from '../actions/billByYear';
// import { billDetailsFetch } from '../actions/billDetails';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BILL_BY_YEAR } from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';

import { getAuthUserFunid } from '../selectors';

export function* billByYearFetchWatchHandle(action) {
  try {
    const { year, init = false } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'settleKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.bill.byyear';
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
          key: 'year',
          value: year,
        },
      ],
      Key,
    );

    const options = [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        year,
      },
    ];

    const response = yield apply(buyoo, buyoo.billByYear, options);
    let { result } = response;
    // let result = [{
    //     "totalAmount": 1148085,
    //     "month": 201809,
    //     "waitingAmount": 1148085,
    //     "expireDate": 1538758799000,
    //     "id": 237,
    //     "status": 10002,
    //     "createDate": 1536049696000
    // },
    // {
    //     "totalAmount": 1148083,
    //     "month": 201810,
    //     "waitingAmount": 1148083,
    //     "expireDate": 1541437199000,
    //     "id": 238,
    //     "status": 10007,
    //     "createDate": 1536049696000
    // },
    // {
    //     "totalAmount": 1148083,
    //     "month": 201811,
    //     "waitingAmount": 1148083,
    //     "expireDate": 1544029199000,
    //     "id": 239,
    //     "status": 10001,
    //     "createDate": 1536049696000
    // },
    // {
    //     "totalAmount": 1148083,
    //     "month": 201812,
    //     "waitingAmount": 1148083,
    //     "expireDate": 1546707599000,
    //     "id": 240,
    //     "status": 10000,
    //     "createDate": 1536049696000
    // }];

    if (response.code !== 10000) {
      yield put(billByYearFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      const lengthNo = () => new Array(12).fill({});

      // const lengthYes = () => {
      //   let beforeMonth;
      //   let afterMonth;

      //   if (result.length === 1) {
      //     beforeMonth = parseInt(result[0].month.toString().slice(4, 6), 10);
      //     afterMonth = parseInt(result[0].month.toString().slice(4, 6), 10);
      //   } else {
      //     beforeMonth = parseInt(result[0].month.toString().slice(4, 6), 10);
      //     afterMonth = parseInt(
      //       result[result.length - 1].month.toString().slice(4, 6),
      //       10,
      //     );
      //   }

      //   const beforeNumber = beforeMonth - 1;
      //   const afterNumber = 12 - afterMonth;

      //   for (let index = 0; index < beforeNumber; index += 1) {
      //     result.unshift({});
      //   }

      //   for (let index = 0; index < afterNumber; index += 1) {
      //     result.push({});
      //   }

      //   return result;
      // };

      const lengthYes = () =>
        new Array(12).fill({}).map((val, index) => {
          let resultMap = {};
          result.forEach(val1 => {
            if (index + 1 === parseInt(val1.month.toString().slice(4, 6), 10)) {
              resultMap = val1;
            }
          });
          return resultMap;
        });

      result = result.length === 0 ? lengthNo() : lengthYes();

      const isHaveBill = init ? result.length !== 0 : true;

      let isOverdue = false;
      result = result.map(val => {
        if (val.month)
          val.month = parseInt(val.month.toString().slice(4, 6), 10);
        if (val.status === 10007) isOverdue = true;
        return val;
      });

      yield put(
        billByYearFetchSuccess({
          year,
          result,
          isOverdue,
          isHaveBill,
        }),
      );
    }
  } catch (err) {
    yield put(billByYearFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* billByYearFetchWatch() {
  yield takeEvery(BILL_BY_YEAR.REQUEST, billByYearFetchWatchHandle);
}

export function* billByYearSuccessWatchHandle() {
  // try {
  //   const { isHaveBill } = action.payload;
  //   if (isHaveBill === false ) {
  //     yield Alert.alert('',
  //       i18n.noBill,
  //       [
  //         {
  //           text: i18n.confirm,
  //           onPress: () => { NavigatoXXXrService.pop(1); }
  //         }
  //       ]
  //     )
  //   } else {
  //     // yield put(billDetailsFetch());
  //   }
  // } catch (err) {
  //   console.warn(err);
  // }
}

export function* billByYearSuccessWatch() {
  yield takeEvery(BILL_BY_YEAR.SUCCESS, billByYearSuccessWatchHandle);
}
