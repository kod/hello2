/* eslint-disable react/no-multi-comp */
/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  componentDidMount() {
    const { initialize, inviterno } = this.props;
    initialize({ inviterno });
  }

  submit = data => {
    const { phone, inviterno } = data;
    const {
      // otpFetch,
      navigation: { navigate },
    } = this.props;
    if (phone) {
      // Keyboard.dismiss();
      // otpFetch(phone);
      // navigate(SCREENS.RegisterStepTwo);
      navigate(SCREENS.RegisterStepTwo, { msisdn: phone, inviterno });
    }
  };

  render() {
    const {
      navigation: { goBack },
      handleSubmit,
      i18n,
      inviterno,
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
            autoFocus
            i18n={i18n}
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
              placeholder={`${i18n.pleaseEnterInvitationCode}`}
              // placeholder={`${i18n.pleaseEnterInvitationCode}(${
              //   i18n.selectFill
              // })`}
              placeholderTextColor="#6D7592"
              editable={inviterno === ''}
            />
          </View>
          <BYButton
            text={i18n.nextStep}
            style={{ marginBottom: 20 }}
            onPress={handleSubmit(this.submit)}
          />
          <NavSidesText
            textLeft={`${i18n.alreadyHaveAnAccount}?`}
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
    (state, props) => {
      // const {
      //   login,
      //   form: { RegisterStepOne },
      // } = state;

      const {
        navigation: {
          state: {
            params,
            // param,
          },
        },
      } = props;

      return {
        inviterno: params ? params.id || '' : '',
        // formValue: RegisterStepOne ? RegisterStepOne.values : '',
      };
    },
    {
      ...otpActionCreators,
    },
  )(RegisterStepOne),
);
