/* eslint-disable no-class-assign */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  // Platform,
  // DeviceEventEmitter,
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
  // SCREENS,
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
import BYTouchable from '../components/BYTouchable';

import { submitDuplicateFreeze } from '../common/helpers';

import * as cityInfosActionCreators from '../common/actions/cityInfos';
import * as addressActionCreators from '../common/actions/address';
import * as modalActionCreators from '../common/actions/modal';
import Loader from '../components/Loader';

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

class AddressModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitfreeze: false,
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndName: null,
      division3rdName: null,
      division4thName: null,
      isFocus: true, // 页面是否显示在前端
    };
  }

  componentDidMount() {
    const {
      initialize,
      navigation,
      addressModifyClear,
      navigation: {
        state: { params },
      },
    } = this.props;

    // this.screenListener = DeviceEventEmitter.addListener(
    //   SCREENS.AddressModify,
    //   () => {
    //     Alert.alert(
    //       '',
    //       i18n.success,
    //       [
    //         {
    //           text: i18n.confirm,
    //           onPress: () => {
    //             goBack();
    //           },
    //         },
    //       ],
    //       { cancelable: false },
    //     );
    //   },
    // );
    this.didFocusSubscription = navigation.addListener('didFocus', () => {
      this.setState({
        isFocus: true,
      });
    });
    this.willBlurSubscription = navigation.addListener('willBlur', () => {
      this.setState({
        isFocus: false,
      });
    });

    addressModifyClear();

    if (params) {
      this.setState({
        division2ndID: params.division2nd,
        division3rdID: params.division3rd,
        division4thID: params.division4th,
        division2ndName: params.division2ndName,
        division3rdName: params.division3rdName,
        division4thName: params.division4thName,
      });
      initialize({
        name: params.username,
        phone: params.msisdn,
        address: params.address,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isFocus } = this.state;
    const { loading: prevLoading } = this.props;
    const {
      addressModifyLoading,
      addressModifyLoaded,
      addressModifyIsTrue,
      i18n,
      navigation: { pop },
      openModal,
      closeModal,
    } = nextProps;

    if (
      addressModifyLoaded === true &&
      addressModifyIsTrue === true &&
      isFocus === true
    ) {
      console.log('addressModifyLoadedaddressModifyLoadedaddressModifyLoaded');
      Alert.alert(
        '',
        i18n.success,
        [
          {
            text: i18n.confirm,
            onPress: () => {
              pop(1);
            },
          },
        ],
        { cancelable: false },
      );
    }

    // if (addressModifyLoading && isFocus === true) {
    //   openModal(MODAL_TYPES.LOADER);
    // } else {
    //   closeModal();
    // }
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
    this.willBlurSubscription.remove();
  }

  callbackToggleMenuBottomSheet(ret) {
    this.setState(ret);
  }

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
      addressModifyFetch,
      addressModifyInfo: { values },
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

    return submitDuplicateFreeze(submitfreeze, this, () =>
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
  }

  render() {
    const {
      division2ndID,
      division3rdID,
      division4thID,
      division2ndName,
      division3rdName,
      division4thName,
    } = this.state;

    const { addressModifyLoading, i18n, openModal } = this.props;

    return (
      <View style={styles.container}>
        <Loader absolutePosition />
        {/* {addressModifyLoading && <Loader absolutePosition />} */}
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
          <BYTouchable
            style={styles.item}
            onPress={() =>
              openModal(MODAL_TYPES.ADDRESSADD, {
                callback: ret => this.callbackToggleMenuBottomSheet(ret),
                params: {
                  division2nd: division2ndID,
                  division3rd: division3rdID,
                  division4th: division4thID,
                  division2ndName,
                  division3rdName,
                  division4thName,
                },
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
          </BYTouchable>
          <BYButton
            styleWrap={styles.submitWrap}
            styleText={styles.submit}
            text={i18n.save}
            onPress={() => this.handleOnPressSubmit()}
          />
        </ScrollView>
      </View>
    );
  }
}

AddressModify = reduxForm({
  form: 'AddressModify',
})(AddressModify);

export default connectLocalization(
  connect(
    state => {
      const {
        cityInfos,
        form,
        userAddAddr,
        addressModify,
        // form,
      } = state;
      return {
        loading: userAddAddr.loading,
        addressModifyLoading: addressModify.loading,
        addressModifyLoaded: addressModify.loaded,
        addressModifyIsTrue: addressModify.isTrue,
        addressModifyInfo: form.AddressModify ? form.AddressModify : {},
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
  )(AddressModify),
);
