import {
  Alert,
  // Platform,
  // DeviceEventEmitter,
} from 'react-native';
import {
  takeEvery,
  // apply,
  put,
  // put,
} from 'redux-saga/effects';
// import { MessageBarManager } from 'react-native-message-bar';
import { clearError } from '../actions/error';
import { ERROR } from '../constants/actionTypes';
import i18n from '../helpers/i18n';

export function* handleAlertError(action) {
  const error = action.payload;
  // yield apply(MessageBarManager, MessageBarManager.hideAlert);
  // yield apply(MessageBarManager, MessageBarManager.showAlert, [
  //   {
  //     message: error,
  //     titleNumberOfLines: 0,
  //     alertType: 'error',
  //     viewTopInset: Platform.OS === 'ios' ? 10 : 0,
  //   },
  // ]);
  Alert.alert('', error, [
    {
      text: i18n.confirm,
      onPress: () => {},
    },
  ]);

  yield put(clearError());
}

export function* watchError() {
  yield takeEvery(ERROR.ADD, handleAlertError);
}
