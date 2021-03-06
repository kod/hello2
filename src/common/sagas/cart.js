import {
  Platform,
  Alert,
  // InteractionManager,
  // DeviceEventEmitter,
} from 'react-native';
import { normalize } from 'normalizr';
import {
  // take,
  // call,
  apply,
  put,
  // race,
  select,
  // fork,
  // cancel,
  takeEvery,
} from 'redux-saga/effects';
import moment from 'moment';
import {
  cartRequest,
  cartSuccess,
  cartFailure,
  // cartAddRequest,
  cartAddSuccess,
  cartAddFailure,
  cartNumberSuccess,
  cartNumberFailure,
  cartDeleteSuccess,
  cartDeleteFailure,
  // cartSelectRequest,
  cartSelectSuccess,
  cartSelectFailure,
  // cartSelectAllRequest,
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
import { encryptMD5, signTypeMD5 } from '../../components/AuthEncrypt';
import { getAuthUserFunid } from '../selectors';
import Schemas from '../constants/schemas';

export function* cartFetchWatchHandle(/* action */) {
  try {
    const funid = yield select(getAuthUserFunid);
    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.cart.query';
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
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.cartGetInfo, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
      },
    ]);

    let cart = [];

    if (response.code === 10000) {
      const array = response.cartitems;

      cart = array.map(val => {
        val.detail = JSON.parse(val.detail) || {};
        val.imageUrl = val.iconUrl || '';
        val.selected = false;
        val.selectedDel = false;
        return val;
      });
      cart = normalize(cart, Schemas.PRODUCTS_ARRAY);
      // for (let index = 0; index < array.length; index += 1) {
      //   let element = array[index];
      //   element = {  ...JSON.parse(element.detail), ...element };
      //   element.imageUrl = element.iconUrl;
      //   element.selected = false;
      //   element.selectedDel = false;
      //   cart.push(element);
      // }
    }

    yield put(
      cartSuccess(cart.result, cart.entities.products, cart.entities.details),
    );
  } catch (err) {
    yield put(cartFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartFetchWatch() {
  yield takeEvery(CART.REQUEST, cartFetchWatchHandle);
}

export function* cartNumberRequestWatchHandle(action) {
  const {
    cartitemid,
    quetity,
    // quetity,
  } = action.payload;
  try {
    const funid = yield select(getAuthUserFunid);

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.cart.change';
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
          key: 'cartitemid',
          value: cartitemid,
        },
        {
          key: 'quetity',
          value: quetity,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.cartChangeNum, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        cartitemid,
        quetity,
      },
    ]);

    let cart = [];
    cart = response;
    // if (response.code === 10000) {
    //   let array = response.cartitems;
    //   for (let index = 0; index < array.length; index += 1) {
    //     let element = array[index];
    //     element = { ...element, ... JSON.parse(element.detail) };
    //     element.imageUrl = element.iconUrl;
    //     cart.push(element);
    //   }
    // }

    yield put(cartNumberSuccess(cart));
  } catch (err) {
    yield put(cartNumberFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartNumberRequestWatch() {
  yield takeEvery(CART_NUMBER.REQUEST, cartNumberRequestWatchHandle);
}

export function* cartDeleteRequestWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const { cartitemids, orderno = '' } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.cart.remove';
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
          key: 'cartitemids',
          value: cartitemids,
        },
        {
          key: 'orderno',
          value: orderno,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.cartRemove, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        cartitemids,
        orderno,
      },
    ]);

    if (response.code === 10000) {
      yield put(cartDeleteSuccess());
    } else {
      yield put(cartDeleteFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    }
  } catch (err) {
    yield put(cartDeleteFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartDeleteRequestWatch() {
  yield takeEvery(CART_DELETE.REQUEST, cartDeleteRequestWatchHandle);
}

export function* cartNumberSuccessWatchHandle() {
  try {
    yield put(cartRequest());
  } catch (err) {
    // yield put(cartNumberFailure());
    // yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartNumberSuccessWatch() {
  yield takeEvery(CART_NUMBER.SUCCESS, cartNumberSuccessWatchHandle);
}

export function* cartDeleteSuccessWatchHandle() {
  try {
    yield put(cartRequest());
  } catch (err) {
    // yield put(cartDeleteFailure());
    // yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartDeleteSuccessWatch() {
  yield takeEvery(CART_DELETE.SUCCESS, cartDeleteSuccessWatchHandle);
}

export function* cartSelectRequestWatchHandle() {
  try {
    yield put(cartSelectSuccess());
  } catch (err) {
    yield put(cartSelectFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartSelectRequestWatch() {
  yield takeEvery(CART_SELECT.REQUEST, cartSelectRequestWatchHandle);
}

export function* cartSelectAllRequestWatchHandle() {
  try {
    yield put(cartSelectAllSuccess());
  } catch (err) {
    yield put(cartSelectAllFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartSelectAllRequestWatch() {
  yield takeEvery(CART_SELECTALL.REQUEST, cartSelectAllRequestWatchHandle);
}

export function* cartAddRequestWatchHandle(action) {
  try {
    const funid = yield select(getAuthUserFunid);
    const { cartitems } = action.payload;

    const Key = 'commodityKey';
    const appId = Platform.OS === 'ios' ? '1' : '2';
    const method = 'fun.cart.gate';
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
          key: 'cartitems',
          value: cartitems,
        },
      ],
      Key,
    );

    const response = yield apply(buyoo, buyoo.cartGate, [
      {
        appid: appId,
        method,
        charset,
        signtype: signType,
        encrypt,
        timestamp,
        version,
        funid,
        cartitems,
      },
    ]);

    if (response.code !== 10000) {
      yield put(cartAddFailure());
      yield put(addError(`msg: ${response.msg}; code: ${response.code}`));
    } else {
      yield put(cartAddSuccess());
    }
  } catch (err) {
    yield put(cartAddFailure());
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartAddRequestWatch() {
  yield takeEvery(CART_ADD.REQUEST, cartAddRequestWatchHandle);
}

export function* cartAddSuccessWatchHandle() {
  try {
    Alert.alert(
      '',
      i18n.success,
      [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ],
      // { cancelable: false },
    );
  } catch (err) {
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* cartAddSuccessWatch() {
  yield takeEvery(CART_ADD.SUCCESS, cartAddSuccessWatchHandle);
}
