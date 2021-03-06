/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  WINDOW_WIDTH,
  CARD_PASSWORD_EXPR,
  MODAL_TYPES,
} from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
import BYTouchable from '../components/BYTouchable';
import ReadSeconds from '../components/ReadSeconds';
import { connectLocalization } from '../components/Localization';

import * as modifyPayPasswordActionCreators from '../common/actions/modifyPayPassword';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  second: {
    height: 20,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
    marginRight: 1,
  },
  secondText: {
    color: '#0076F7',
    fontSize: 11,
  },
  closeIcon: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ccc',
  },
});

class TransactionPasswordStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // seconds: 0,
      // ing: false,
    };
  }

  componentDidMount() {
    const { modifyPayPasswordFetchClear } = this.props;
    modifyPayPasswordFetchClear();
  }

  componentWillReceiveProps(nextProps) {
    const { loading: prevLoading, loaded: prevLoaded } = this.props;
    const {
      loading,
      openModal,
      closeModal,
      loaded,
      isTrue,
      i18n,
      navigation: { pop },
    } = nextProps;

    if (prevLoaded !== loaded && loaded === true && isTrue === true) {
      // 修改交易密码成功
      Alert.alert('', i18n.success, [
        {
          text: i18n.confirm,
          onPress: () => {
            pop(3);
          },
        },
      ]);
    }

    if (prevLoading !== loading) {
      if (loading === false) {
        closeModal();
      } else {
        openModal(MODAL_TYPES.LOADER);
      }
    }
  }

  renderInputRightClose = () => (
    <BYTouchable>
      <MaterialIcons name="cancel" style={styles.closeIcon} />
    </BYTouchable>
  );

  handleOnPressSubmit() {
    const {
      i18n,
      formValue,
      modifyPayPasswordFetch,
      // navigation: { state },
    } = this.props;
    if (!formValue) return false;
    if (!formValue.code) {
      Alert.alert(
        '',
        i18n.pleaseEnterSMSVerificationCode,
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

    if (!CARD_PASSWORD_EXPR.test(formValue.password)) {
      Alert.alert(
        '',
        i18n.pleaseEnter6DigitsPassword,
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

    if (!formValue.repassword) {
      Alert.alert(
        '',
        i18n.pleaseEnterPasswordAgain,
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

    if (formValue.password !== formValue.repassword) {
      Alert.alert(
        '',
        i18n.theWwoPasswordsAreNotSame,
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
    return modifyPayPasswordFetch(formValue.password, formValue.code);
  }

  render() {
    const { i18n, msisdn } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader title={i18n.setTransactionPassword} />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="code"
            component={InputRight}
            inputRight={<ReadSeconds i18n={i18n} msisdn={msisdn} />}
            // inputRight={this.renderInputRightCode()}
            placeholder={i18n.pleaseEnterSMSVerificationCode}
            keyboardType="numeric"
            // onSubmitEditing={() => { this.password.focus(); }}
            // blurOnSubmit={false}
            autoFocus
          />
          <Field
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder={i18n.pleaseEnter6DigitsPassword}
            secureTextEntry
            keyboardType="numeric"
            // onSubmitEditing={() => { this.repassword.focus(); }}
            // ref={input => { this.password = input }}
            // blurOnSubmit={false}
          />
          <Field
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{ marginBottom: 45 }}
            placeholder={i18n.pleaseEnterPasswordAgain}
            secureTextEntry
            keyboardType="numeric"
            // ref={input => { this.repassword = input }}
          />
          <BYButton
            text={i18n.submit}
            style={{ marginBottom: 30 }}
            onPress={() => this.handleOnPressSubmit()}
          />
        </ScrollView>
      </View>
    );
  }
}

TransactionPasswordStepTwo = reduxForm({
  form: 'TransactionPasswordStepTwo',
})(TransactionPasswordStepTwo);

export default connectLocalization(
  connect(
    state => {
      const {
        form: { TransactionPasswordStepTwo: TransactionPasswordStepTwoX },
        modifyPayPassword,
        login,
      } = state;
      return {
        msisdn: login.user ? login.user.msisdn : '',
        loading: modifyPayPassword.loading,
        loaded: modifyPayPassword.loaded,
        isTrue: modifyPayPassword.isTrue,
        formValue: TransactionPasswordStepTwoX
          ? TransactionPasswordStepTwoX.values
          : '',
      };
    },
    {
      ...modifyPayPasswordActionCreators,
      ...modalActionCreators,
    },
  )(TransactionPasswordStepTwo),
);
