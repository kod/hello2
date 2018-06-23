import { Platform, ToastAndroid, InteractionManager, DeviceEventEmitter } from 'react-native';
import { normalize } from 'normalizr';
import {
  take,
  call,
  apply,
  put,
  race,
  select,
  fork,
  cancel,
  takeEvery,
} from 'redux-saga/effects';
import {
  cartRequest,
  cartSuccess,
  cartFailure,
  cartAddRequest,
  cartAddSuccess,
  cartAddFailure,
  cartNumberSuccess,
  cartNumberFailure,
  cartDeleteSuccess,
  cartDeleteFailure,
  cartSelectRequest,
  cartSelectSuccess,
  cartSelectFailure,
  cartSelectAllRequest,
  cartSelectAllSuccess,
  cartSelectAllFailure,
} from '../actions/cart';
import {
  CART,
  CART_ADD,
  CART_NUMBER,
  CART_SELECT,
  CART_SELECTALL,
  CART_DELETE,
} from '../constants/actionTypes';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import i18n from '../helpers/i18n';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";
import { getAuthUserFunid, getCartItems, getCart } from '../selectors';
import Schemas from "../constants/schemas";

export function* cartFetchWatchHandle(action) {
  try {
    const funid = action.payload.funid;
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.cart.query';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';

    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
      ],
      Key
    );

    const response = yield apply(buyoo, buyoo.cartGetInfo, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
      }
    ]);

    let cart = [];
    
    if (response.code === 10000) {
      let array = response.cartitems;

      cart = array.map((val, key) => {
        val.detail = JSON.parse(val.detail) || {};
        val.imageUrl = val.iconUrl || '';
        val.selected = false;
        val.selectedDel = false;
        return val;
      });
      cart = normalize(cart, Schemas.PRODUCTS_ARRAY);
      // for (let index = 0; index < array.length; index++) {
      //   let element = array[index];
      //   element = {  ...JSON.parse(element.detail), ...element };
      //   element.imageUrl = element.iconUrl;
      //   element.selected = false;
      //   element.selectedDel = false;
      //   cart.push(element);
      // }
    }

    yield put(cartSuccess(cart.result, cart.entities.products, cart.entities.details));
  } catch (err) {
    yield put(cartFailure());
    yield put(addError(err.toString()));
  }
}

export function* cartFetchWatch() {
  yield takeEvery(CART.REQUEST, cartFetchWatchHandle);
}

export function* cartNumberRequestWatchHandle(action) {
  try {
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.cart.change';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';
    
    const funid = action.payload.funid;
    var cartitemid = action.payload.cartitemid;
    var quetity = action.payload.quetity;
  
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'cartitemid',
          value: cartitemid
        },
        {
          key: 'quetity',
          value: quetity
        }
      ],
        Key
    );

    const response = yield apply(buyoo, buyoo.cartChangeNum, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        cartitemid: cartitemid,
        quetity: quetity
      }
    ]);
    // 

    let cart = [];
    cart = response;
    // if (response.code === 10000) {
    //   let array = response.cartitems;
    //   for (let index = 0; index < array.length; index++) {
    //     let element = array[index];
    //     element = { ...element, ... JSON.parse(element.detail) };
    //     element.imageUrl = element.iconUrl;
    //     cart.push(element);
    //   }
    // }

    yield put(cartNumberSuccess(cart));
  } catch (err) {
    yield put(cartNumberFailure());
    yield put(addError(err.toString()));
  }
}

export function* cartNumberRequestWatch() {
  yield takeEvery(CART_NUMBER.REQUEST, cartNumberRequestWatchHandle);
}

export function* cartDeleteRequestWatchHandle(action) {
  try {
    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.cart.remove';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';
    
    const { funid, cartitemids, orderno = '' } = action.payload;
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'cartitemids',
          value: cartitemids
        },
        {
          key: 'orderno',
          value: orderno
        }
      ],
        Key
    );

    const response = yield apply(buyoo, buyoo.cartRemove, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        cartitemids: cartitemids,
        orderno: orderno
      }
    ]);

    if (response.code === 10000) {
      yield put(cartDeleteSuccess());
    } else {
      yield put(cartDeleteFailure());
      yield put(addError(response.msg));
    }

  } catch (err) {
    yield put(cartDeleteFailure());
    yield put(addError(err.toString()));
  }
}

export function* cartDeleteRequestWatch() {
  yield takeEvery(CART_DELETE.REQUEST, cartDeleteRequestWatchHandle);
}

export function* cartNumberSuccessWatchHandle(action) {
  try {
    const authUserFunid = yield select(getAuthUserFunid);
    yield put(cartRequest(authUserFunid));
    
  } catch (err) {
    // yield put(cartNumberFailure());
    // yield put(addError(err.toString()));
  }
}

export function* cartNumberSuccessWatch() {
  yield takeEvery(CART_NUMBER.SUCCESS, cartNumberSuccessWatchHandle);
}

export function* cartDeleteSuccessWatchHandle(action) {
  try {
    const authUserFunid = yield select(getAuthUserFunid);
    yield put(cartRequest(authUserFunid));
  } catch (err) {
    // yield put(cartDeleteFailure());
    // yield put(addError(err.toString()));
  }
}

export function* cartDeleteSuccessWatch() {
  yield takeEvery(CART_DELETE.SUCCESS, cartDeleteSuccessWatchHandle);
}

export function* cartSelectRequestWatchHandle(action) {
  try {
    yield put(cartSelectSuccess());
  } catch (err) {
    yield put(cartSelectFailure());
    yield put(addError(err.toString()));
  }
}

export function* cartSelectRequestWatch() {
  yield takeEvery(CART_SELECT.REQUEST, cartSelectRequestWatchHandle);
}

export function* cartSelectAllRequestWatchHandle(action) {
  try {
    yield put(cartSelectAllSuccess());
  } catch (err) {
    yield put(cartSelectAllFailure());
    yield put(addError(err.toString()));
  }
}

export function* cartSelectAllRequestWatch() {
  yield takeEvery(CART_SELECTALL.REQUEST, cartSelectAllRequestWatchHandle);
}

export function* cartAddRequestWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const { cartitems } = action.payload;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let method = 'fun.cart.gate';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '2.0';
    
    let signType = signType_MD5(appId, method, charset, Key, true);

    let encrypt = encrypt_MD5(
      [
        {
          key: 'funid',
          value: funid
        },
        {
          key: 'cartitems',
          value: cartitems
        },
      ],
        Key
    );

    const response = yield apply(buyoo, buyoo.cartGate, [
      {
        appid: appId,
        method: method,
        charset: charset,
        signtype: signType,
        encrypt: encrypt,
        timestamp: timestamp,
        version: version,
        funid: funid,
        cartitems: cartitems,
      }
    ]);

    if (response.code !== 10000) {
      yield put(cartAddFailure());
      yield put(addError(response.msg));
      return false;
    }

    yield put(cartAddSuccess());
  } catch (err) {
    yield put(cartAddFailure());
    yield put(addError(err.toString()));
  }
}

export function* cartAddRequestWatch() {
  yield takeEvery(CART_ADD.REQUEST, cartAddRequestWatchHandle);
}

export function* cartAddSuccessWatchHandle(action) {
  try {
    if(Platform.OS === 'android') yield apply(ToastAndroid, ToastAndroid.show, [ i18n.success, ToastAndroid.SHORT ]);
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartAddSuccessWatch() {
  yield takeEvery(CART_ADD.SUCCESS, cartAddSuccessWatchHandle);
}