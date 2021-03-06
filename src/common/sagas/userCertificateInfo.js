import { Platform } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  userCertificateInfoFetchSuccess,
  userCertificateInfoFetchFailure,
} from '../actions/userCertificateInfo';
import {
  userAddDetailInfoFetchSuccess,
  userAddDetailInfoFetchFailure,
} from '../actions/userAddDetailInfo';
import {
  certifiedInformationFetchSuccess,
  // certifiedInformationFetchFailure,
} from '../actions/certifiedInformation';
import { cardSubmitFetch } from '../actions/cardSubmit';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  USER_CERTIFICATE_INFO,
  // ADD_DETAIL_INFO,
} from '../constants/actionTypes';
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import {
  getAuthUserFunid,
  getCertifiedInformationCertUser,
  // getCertifiedInformationCertUser,
} from '../selectors';
// import i18n from '../helpers/i18n';

export function* userCertificateInfoFetchWatchHandle(/* action */) {
  try {
    // const {  } = action.payload;
    const funid = yield select(getAuthUserFunid);

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.userviewdetail';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const msisdn = '';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'msisdn',
          value: msisdn,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.userCertificateInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        funid,
        msisdn,
      },
    ]);

    let result = {};

    if (response.code === 10000) {
      result = response;
    }

    yield put(userCertificateInfoFetchSuccess(result));
    yield put(certifiedInformationFetchSuccess(result));

    // switch (type) {
    //   case 'userCertificateInfo':
    //     yield put(userCertificateInfoFetchSuccess(result));
    //     break;

    //   case 'certifiedInformation':
    //     yield put(certifiedInformationFetchSuccess(result));
    //     break;

    //   default:
    //     yield put(userCertificateInfoFetchSuccess(result));
    //     break;
    // }
  } catch (err) {
    yield put(userCertificateInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* userAddDetailInfoFetchWatchHandle(/* action */) {
  try {
    const funid = yield select(getAuthUserFunid);
    const certifiedInformationCertUser = yield select(
      getCertifiedInformationCertUser,
    );
    const {
      username,
      // funid,
      sex,
      identification,
      address,
      email,
      collegename,
      collegeaddr,
      department,
      specialty,
      degree = '',
      connectusername1,
      connectusermsisdn1,
      connectuserrelation1,
      connectuseridentification1,
      connectusername2,
      connectusermsisdn2,
      connectuserrelation2,
      connectuseridentification2,
      connectusername3,
      connectusermsisdn3,
      connectuserrelation3,
      connectuseridentification3,
      headimage,
    } = certifiedInformationCertUser;

    let {
      admissiontime,
      graduationtime,
      birthday,
    } = certifiedInformationCertUser;

    birthday = birthday
      ? `${birthday.slice(6, 10)}-${birthday.slice(3, 5)}-${birthday.slice(
          0,
          2,
        )}`
      : '';
    admissiontime = admissiontime
      ? `${admissiontime.slice(6, 10)}-${admissiontime.slice(
          3,
          5,
        )}-${admissiontime.slice(0, 2)} 11:11:11`
      : '';
    graduationtime = graduationtime
      ? `${graduationtime.slice(6, 10)}-${graduationtime.slice(
          3,
          5,
        )}-${graduationtime.slice(0, 2)} 11:11:11`
      : '';

    const Key = 'userKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.uc.useradddetail';
    const charset = 'utf-8';
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const version = '1.0';

    const signType = signTypeMD5(appId, method, charset, Key, false);

    const encrypt = encryptMD5(
      [
        {
          key: 'username',
          value: username,
        },
        {
          key: 'funid',
          value: funid,
        },
        {
          key: 'birthday',
          value: birthday,
        },
        {
          key: 'identification',
          value: identification,
        },
        {
          key: 'address',
          value: address,
        },
        {
          key: 'email',
          value: email,
        },
        {
          key: 'connectusername1',
          value: connectusername1,
        },
        {
          key: 'connectusermsisdn1',
          value: connectusermsisdn1,
        },
        {
          key: 'connectuserrelation1',
          value: connectuserrelation1,
        },
        {
          key: 'connectuseridentification1',
          value: connectuseridentification1,
        },
        {
          key: 'connectusername2',
          value: connectusername2,
        },
        {
          key: 'connectusermsisdn2',
          value: connectusermsisdn2,
        },
        {
          key: 'connectuserrelation2',
          value: connectuserrelation2,
        },
        {
          key: 'connectuseridentification2',
          value: connectuseridentification2,
        },
        {
          key: 'connectusername3',
          value: connectusername3,
        },
        {
          key: 'connectusermsisdn3',
          value: connectusermsisdn3,
        },
        {
          key: 'connectuserrelation3',
          value: connectuserrelation3,
        },
        {
          key: 'connectuseridentification3',
          value: connectuseridentification3,
        },
        {
          key: 'collegeaddr',
          value: collegeaddr,
        },
        {
          key: 'collegename',
          value: collegename,
        },
        {
          key: 'degree',
          value: degree,
        },
        {
          key: 'headimage',
          value: headimage,
        },
        {
          key: 'sex',
          value: sex,
        },
        {
          key: 'department',
          value: department,
        },
        {
          key: 'specialty',
          value: specialty,
        },
        {
          key: 'admissiontime',
          value: admissiontime,
        },
        {
          key: 'graduationtime',
          value: graduationtime,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.userAddDetailInfo, [
      {
        appId,
        method,
        charset,
        signType,
        encrypt,
        timestamp,
        version,
        username,
        funid,
        birthday,
        identification,
        address,
        email,
        connectusername1,
        connectusermsisdn1,
        connectuserrelation1,
        connectuseridentification1,
        connectusername2,
        connectusermsisdn2,
        connectuserrelation2,
        connectuseridentification2,
        connectusername3,
        connectusermsisdn3,
        connectuserrelation3,
        connectuseridentification3,
        collegeaddr,
        collegename,
        degree,
        headimage,
        sex,
        department,
        specialty,
        admissiontime,
        graduationtime,
      },
    ]);

    if (response.code !== 10000) {
      yield put(userAddDetailInfoFetchFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(userAddDetailInfoFetchSuccess());
    }
  } catch (err) {
    yield put(userAddDetailInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* userAddDetailInfoSuccessWatchHandle() {
  try {
    const certifiedInformationCertUser = yield select(
      getCertifiedInformationCertUser,
    );
    const {
      username,
      // username,
    } = certifiedInformationCertUser;
    yield put(
      cardSubmitFetch({
        name: username,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* userCertificateInfoFetchWatch() {
  yield takeEvery(
    USER_CERTIFICATE_INFO.REQUEST,
    userCertificateInfoFetchWatchHandle,
  );
}
