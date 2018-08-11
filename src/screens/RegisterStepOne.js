import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import NavSidesText from '../components/NavSidesText';
import BYTextInput from '../components/BYTextInput';
import { connectLocalization } from '../components/Localization';

import { PHONE_EXPR } from '../common/constants';

import { SCREENS } from '../common/constants';

import * as otpActionCreators from "../common/actions/otp";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
});

class InvitationInput extends Component {
  render() {
    const {
      input,
      ...restProps
    } = this.props;
    return (
      <BYTextInput
        onChangeText={input.onChange}
        value={input.value}
        {...restProps}
      />
    )
  }
}

const validate = (values, props) => {
  const { phone } = values;
  const { i18n } = props;
  const errors = {};

  if (!PHONE_EXPR.test(phone)) {
    errors.phone = 'phone error';
  }
  return errors;
};

class RegisterStepOne extends Component {

  submit = data => {
    const {
      phone,
    } = data;
    const {
      otpFetch,
      navigation: { goBack, navigate },
    } = this.props;
    if (phone) {
      Keyboard.dismiss();
      otpFetch(phone);
      navigate(SCREENS.RegisterStepTwo)
    }
  }
  
  render() {
    const {
      navigation: { goBack, navigate },
      handleSubmit,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />

        <ScrollView keyboardShouldPersistTaps="always">
          <Field 
            name="phone"
            component={InputCountry}
            keyboardType={'phone-pad'}
            style={{marginBottom: 30}}
          />
          <View style={{ paddingLeft: SIDEINTERVAL, paddingRight: SIDEINTERVAL }}>
            <Field 
              name="inviterno"
              component={InvitationInput}
              style={{ flex: 1, paddingLeft: SIDEINTERVAL, paddingTop: 10, paddingBottom: 10, backgroundColor: '#E0E3EF', marginBottom: 75 }} 
              placeholder={'Please enter the invitation code.(选填)'} 
              placeholderTextColor={'#6D7592'} 
            />
          </View>
          <BYButton text={'Next step'} style={{ marginBottom: 20 }} onPress={handleSubmit(this.submit)} />
          <NavSidesText textLeft={'Already have an account?'} navigateLeft={() => goBack()} />
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
    () => {
      return (state, props) => {
        // const {
        //   auth,
        //   form: { RegisterStepOne },
        // } = state;
        // const msisdn = props.navigation.state.params.msisdn || '';
        return {
          // msisdn: auth.user ? auth.user.msisdn : '',
          // formValue: RegisterStepOne ? RegisterStepOne.values : '',
        }
      }
    },
    {
      ...otpActionCreators
    }
  )(RegisterStepOne),
);
