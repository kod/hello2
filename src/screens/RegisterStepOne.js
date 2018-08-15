/* eslint-disable react/no-multi-comp */
/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { PHONE_EXPR, SCREENS, SIDEINTERVAL } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import NavSidesText from '../components/NavSidesText';
import BYTextInput from '../components/BYTextInput';
import { connectLocalization } from '../components/Localization';

import * as otpActionCreators from '../common/actions/otp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
});

class InvitationInput extends Component {
  render() {
    const { input, ...restProps } = this.props;
    return (
      <BYTextInput
        onChangeText={input.onChange}
        value={input.value}
        {...restProps}
      />
    );
  }
}

const validate = (values, props) => {
  const { phone } = values;
  const { i18n } = props;
  const errors = {};

  if (!PHONE_EXPR.test(phone)) {
    errors.phone = i18n.pleaseEnterCorrectPhoneNumber;
  }
  return errors;
};

class RegisterStepOne extends Component {
  submit = data => {
    const { phone } = data;
    const {
      otpFetch,
      navigation: { navigate },
    } = this.props;
    if (phone) {
      Keyboard.dismiss();
      otpFetch(phone);
      navigate(SCREENS.RegisterStepTwo);
    }
  };

  render() {
    const {
      navigation: { goBack },
      handleSubmit,
      i18n,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />

        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="phone"
            component={InputCountry}
            keyboardType="phone-pad"
            style={{ marginBottom: 30 }}
          />
          <View
            style={{ paddingLeft: SIDEINTERVAL, paddingRight: SIDEINTERVAL }}
          >
            <Field
              name="inviterno"
              component={InvitationInput}
              style={{
                flex: 1,
                paddingLeft: SIDEINTERVAL,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: '#E0E3EF',
                marginBottom: 75,
              }}
              placeholder={`${i18n.pleaseEnterInvitationCode}(${
                i18n.selectFill
              })`}
              placeholderTextColor="#6D7592"
            />
          </View>
          <BYButton
            text={i18n.nextStep}
            style={{ marginBottom: 20 }}
            onPress={handleSubmit(this.submit)}
          />
          <NavSidesText
            textLeft={i18n.alreadyHaveAnAccount}
            navigateLeft={() => goBack()}
          />
        </ScrollView>
      </View>
    );
  }
}

RegisterStepOne = reduxForm({
  form: 'RegisterStepOne',
  validate,
})(RegisterStepOne);

// export default RegisterStepOne;

export default connectLocalization(
  connect(
    () => () => {
      // const {
      //   login,
      //   form: { RegisterStepOne },
      // } = state;
      // const msisdn = props.navigation.state.params.msisdn || '';
      console.log();
      return {
        // msisdn: login.user ? login.user.msisdn : '',
        // formValue: RegisterStepOne ? RegisterStepOne.values : '',
      };
    },
    {
      ...otpActionCreators,
    },
  )(RegisterStepOne),
);
