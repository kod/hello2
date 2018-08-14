/* eslint-disable no-class-assign */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  // Platform,
  // ToastAndroid,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
  PRIMARY_COLOR,
  // BORDER_COLOR,
} from '../styles/variables';
import {
  // WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  MODAL_TYPES,
  SCREENS,
  PHONE_EXPR,
  NAME_EXPR,
} from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYTextInput from '../components/BYTextInput';
import FieldInput from '../components/FieldInput';
import CustomIcon from '../components/CustomIcon';
// import BYModal from '../components/BYModal';
import BYButton from '../components/BYButton';
import { connectLocalization } from '../components/Localization';
import PXTouchable from '../components/BYTouchable';

import { submitDuplicateFreeze } from '../common/helpers';

import * as cityInfosActionCreators from '../common/actions/cityInfos';
import * as addressActionCreators from '../common/actions/address';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  title: {
    height: 45,
    lineHeight: 45,
    color: '#666',
    paddingRight: SIDEINTERVAL / 2,
  },
  textInput: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
  },
  address: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 5,
    color: '#333',
  },
  arrow: {
    fontSize: 10,
    color: '#ccc',
    paddingTop: 1,
  },
  submitWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: WINDOW_HEIGHT * 0.1,
  },
  submit: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: PRIMARY_COLOR,
  },
  submitActive: {
    // backgroundColor: PRIMARY_COLOR,
  },
});

class AddressAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitfreeze: false,
      isOpenMenuBottomSheet: false,
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndName: null,
      division3rdName: null,
      division4thName: null,
    };
  }

  componentDidMount() {
    const {
      initialize,
      navigation: {
        goBack,
        state: { params },
      },
    } = this.props;

    this.screenListener = DeviceEventEmitter.addListener(
      SCREENS.AddressAdd,
      () => {
        goBack();
      },
    );

    if (params) {
      initialize({
        name: params.username,
        phone: params.msisdn,
        address: params.address,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
    this.screenListener.remove();
  }

  callbackToggleMenuBottomSheet(ret) {
    this.setState(ret);
  }

  handleOnPressToggleMenuBottomSheet = type => {
    const {
      isOpenMenuBottomSheet,
      // isOpenMenuBottomSheet,
    } = this.state;

    const {
      cityInfosFetch,
      division2ndItems,
      // division2ndItems,
    } = this.props;

    if (!isOpenMenuBottomSheet && division2ndItems.length === 0) {
      cityInfosFetch(1, 'division2nd');
    }

    this.setState({
      isOpenMenuBottomSheet:
        typeof type !== 'boolean' ? !isOpenMenuBottomSheet : type,
    });
  };

  handleOnPressSubmit() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
      submitfreeze,
      // division4thID,
    } = this.state;

    const {
      navigation: {
        state: { params },
      },
      addressAddFetch,
      addressModifyFetch,
      addressAddInfo: { values },
      i18n,
    } = this.props;
    // return false;

    if (!values) {
      Alert.alert(
        '',
        i18n.pleaseEnterYourActualName,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
      return false;
    }

    const {
      name = '',
      phone = '',
      address = '',
      // address = '',
    } = values;

    if (!NAME_EXPR.test(name)) {
      Alert.alert(
        '',
        i18n.pleaseEnterCorrectFullName,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
      return false;
    }

    if (!PHONE_EXPR.test(phone)) {
      Alert.alert(
        '',
        i18n.pleaseEnterCorrectPhoneNumber,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
      return false;
    }

    if (address.length === 0) {
      Alert.alert(
        '',
        i18n.pleaseEnterAddress,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
      return false;
    }

    if (!division4thID) {
      Alert.alert(
        '',
        i18n.pleaseEnterArea,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
      return false;
    }

    if (params) {
      submitDuplicateFreeze(submitfreeze, this, () =>
        addressModifyFetch({
          id: params.id,
          msisdn: phone,
          address,
          isdefault: params.isdefault,
          username: name,
          division2nd: division2ndID,
          division3rd: division3rdID,
          division4th: division4thID,
        }),
      );
      return false;
    }

    submitDuplicateFreeze(submitfreeze, this, () =>
      addressAddFetch({
        msisdn: phone,
        address,
        isdefault: 'Y',
        username: name,
        division2nd: division2ndID,
        division3rd: division3rdID,
        division4th: division4thID,
        screen: SCREENS.AddressAdd,
      }),
    );
    return true;
  }

  render() {
    const {
      division2ndName,
      division3rdName,
      division4thName,
      // isOpenMenuBottomSheet,
    } = this.state;

    const {
      // navigation: { goBack, navigate },
      i18n,
      openModal,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.item}>
            <Text style={styles.title}>{i18n.actualName}</Text>
            <Field
              name="name"
              component={FieldInput}
              style={styles.textInput}
              placeholder={i18n.pleaseEnterYourActualName}
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{i18n.phone}</Text>
            <Field
              name="phone"
              component={FieldInput}
              style={styles.textInput}
              placeholder={i18n.pleaseEnterYourPhoneNumber}
              placeholderTextColor="#ccc"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{i18n.address}</Text>
            <Field
              name="address"
              component={FieldInput}
              style={styles.textInput}
              placeholder={i18n.pleaseEnterAddress}
              placeholderTextColor="#ccc"
            />
          </View>
          <PXTouchable
            style={styles.item}
            onPress={() =>
              openModal(MODAL_TYPES.ADDRESSADD, {
                callback: ret => this.callbackToggleMenuBottomSheet(ret),
              })
            }
          >
            <Text style={styles.title}>{i18n.communeDistrictCity}</Text>
            <BYTextInput
              placeholder={i18n.pleaseChoose}
              placeholderTextColor="#ccc"
              style={styles.address}
              value={
                division4thName
                  ? `${division4thName}, ${division3rdName}, ${division2ndName}`
                  : ''
              }
              editable={false}
            />
            <CustomIcon style={styles.arrow} name="arrowright" />
          </PXTouchable>
          <BYButton
            styleWrap={styles.submitWrap}
            styleText={styles.submit}
            text={i18n.save}
            onPress={() => this.handleOnPressSubmit()}
          />
        </ScrollView>
        {/* <BYModal
          visible={isOpenMenuBottomSheet}
          onRequestClose={this.handleOnPressToggleMenuBottomSheet}
        >
          <AddressAddModal 
            onRequestClose={this.handleOnPressToggleMenuBottomSheet}
            callback={this.callbackToggleMenuBottomSheet}
          />
        </BYModal> */}
      </View>
    );
  }
}

AddressAdd = reduxForm({
  form: 'AddressAdd',
})(AddressAdd);

export default connectLocalization(
  connect(
    state => {
      const {
        cityInfos,
        form,
        // form,
      } = state;
      return {
        addressAddInfo: form.AddressAdd ? form.AddressAdd : {},
        division2ndItems: cityInfos.division2nd,
        division3rdItems: cityInfos.division3rd,
        division4thItems: cityInfos.division4th,
      };
    },
    {
      ...cityInfosActionCreators,
      ...addressActionCreators,
      ...modalActionCreators,
    },
  )(AddressAdd),
);
