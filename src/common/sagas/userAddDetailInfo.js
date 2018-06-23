import { Platform, ToastAndroid, Alert } from 'react-native';
import { takeEvery, apply, put, select } from 'redux-saga/effects';
import {
  userAddDetailInfoFetchSuccess,
  userAddDetailInfoFetchFailure,
} from '../actions/userAddDetailInfo';
import { cardSubmitFetch } from '../actions/cardSubmit';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import {
  ADD_DETAIL_INFO,
} from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import moment from "moment";
import { getAuthUserFunid, getCertifiedInformationCertUser } from '../selectors';
import i18n from '../helpers/i18n';

import NavigatorService from '../../navigations/NavigatorService';

export function* userAddDetailInfoFetchWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const certifiedInformationCertUser = yield select(getCertifiedInformationCertUser);
    let {
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
      admissiontime,
      graduationtime,
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
      birthday,
    } = certifiedInformationCertUser;

    birthday = birthday ? `${birthday.slice(6, 10)}-${birthday.slice(3, 5)}-${birthday.slice(0, 2)}` : '';
    admissiontime = admissiontime ? `${admissiontime.slice(6, 10)}-${admissiontime.slice(3, 5)}-${admissiontime.slice(0, 2)} 11:11:11` : '';
    graduationtime = graduationtime ? `${graduationtime.slice(6, 10)}-${graduationtime.slice(3, 5)}-${graduationtime.slice(0, 2)} 11:11:11` : '';

    let Key = 'userKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.uc.useradddetail';
    let charset = 'utf-8';
    let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    let version = '1.0';

    let signType = signType_MD5(appId, method, charset, Key, false);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'username',
          value: username
        },
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'birthday',
          value: birthday
        },
        {
          key: 'identification',
          value: identification
        },
        {
          key: 'address',
          value: address
        },
        {
          key: 'email',
          value: email
        },
        {
          key: 'connectusername1',
          value: connectusername1
        },
        {
          key: 'connectusermsisdn1',
          value: connectusermsisdn1
        },
        {
          key: 'connectuserrelation1',
          value: connectuserrelation1
        },
        {
          key: 'connectuseridentification1',
          value: connectuseridentification1
        },
        {
          key: 'connectusername2',
          value: connectusername2
        },
        {
          key: 'connectusermsisdn2',
          value: connectusermsisdn2
        },
        {
          key: 'connectuserrelation2',
          value: connectuserrelation2
        },
        {
          key: 'connectuseridentification2',
          value: connectuseridentification2
        },
        {
          key: 'connectusername3',
          value: connectusername3
        },
        {
          key: 'connectusermsisdn3',
          value: connectusermsisdn3
        },
        {
          key: 'connectuserrelation3',
          value: connectuserrelation3
        },
        {
          key: 'connectuseridentification3',
          value: connectuseridentification3
        },
        {
          key: 'collegeaddr',
          value: collegeaddr
        },
        {
          key: 'collegename',
          value: collegename
        },
        {
          key: 'degree',
          value: degree
        },
        {
          key: 'headimage',
          value: headimage
        },
        {
          key: 'sex',
          value: sex
        },
        {
          key: 'department',
          value: department
        },
        {
          key: 'specialty',
          value: specialty
        },
        {
          key: 'admissiontime',
          value: admissiontime
        },
        {
          key: 'graduationtime',
          value: graduationtime
        }
      ],
        Key
    );

    const response = yield apply(buyoo, buyoo.userAddDetailInfo, [
      {
        appId: appId,
        method: method,
        charset: charset,
        signType: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        username: username,
        funid: funid,
        birthday: birthday,
        identification: identification,
        address: address,
        email: email,
        connectusername1: connectusername1,
        connectusermsisdn1: connectusermsisdn1,
        connectuserrelation1: connectuserrelation1,
        connectuseridentification1: connectuseridentification1,
        connectusername2: connectusername2,
        connectusermsisdn2: connectusermsisdn2,
        connectuserrelation2: connectuserrelation2,
        connectuseridentification2: connectuseridentification2,
        connectusername3: connectusername3,
        connectusermsisdn3: connectusermsisdn3,
        connectuserrelation3: connectuserrelation3,
        connectuseridentification3: connectuseridentification3,
        collegeaddr: collegeaddr,
        collegename: collegename,
        degree: degree,
        headimage: headimage,
        sex: sex,
        department: department,
        specialty: specialty,
        admissiontime: admissiontime,
        graduationtime: graduationtime
      }
    ]);

    if (response.code !== 10000) {
      yield put(userAddDetailInfoFetchFailure());
      yield put(addError(response.msg));
      return false;
    }
    yield put(userAddDetailInfoFetchSuccess());
  } catch (err) {
    yield put(userAddDetailInfoFetchFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* userAddDetailInfoSuccessWatchHandle() {
  try {
    const certifiedInformationCertUser = yield select(getCertifiedInformationCertUser);
    const {
      username
    } = certifiedInformationCertUser;
    // if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
    yield put(
      cardSubmitFetch({
        name: username,
      })
    );

    // Alert.alert(
    //   '',
    //   '申请提交成功, 稍后会有校园大使与您联系',
    //   [
    //     {
    //       text: i18n.confirm,
    //       onPress: () => {
    //         NavigatorService.back();
    //       },
    //     }
    //   ]
    // )

  } catch (error) {
    
  }
}

export function* userAddDetailInfoFetchWatch() {
  yield takeEvery(ADD_DETAIL_INFO.REQUEST, userAddDetailInfoFetchWatchHandle);
}


export function* userAddDetailInfoSuccessWatch() {
  yield takeEvery(ADD_DETAIL_INFO.SUCCESS, userAddDetailInfoSuccessWatchHandle);
}
