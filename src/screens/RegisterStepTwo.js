/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WINDOW_WIDTH, LOGIN_PASSWORD_EXPR } from '../common/constants';
import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
// import BYTouchable from '../components/BYTouchable';
import ReadSeconds from '../components/ReadSeconds';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import * as registerActionCreators from '../common/actions/register';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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

const validate = (values, props) => {
  const { otp = '', password = '', repassword = '' } = values;
  const { i18n } = props;
  const errors = {};

  if (!otp) {
    errors.otp = i18n.pleaseEnterSMSVerificationCode;
  }
  if (!LOGIN_PASSWORD_EXPR.test(password)) {
    errors.password = i18n.pleaseEnter820CharactersOrNumbers;
  }
  if (password !== repassword) {
    errors.repassword = i18n.theWwoPasswordsAreNotSame;
  }
  return errors;
};

class RegisterStepTwo extends Component {
  submit = data => {
    const { otp, password, repassword } = data;
    const {
      registerFetch,
      // navigation: { goBack, navigate },
      registerStepOneValues: { phone, inviterno },
    } = this.props;
    if (otp && password && repassword) {
      Keyboard.dismiss();
      registerFetch({
        otp,
        password,
        repassword,
        msisdn: phone,
        inviterno,
      });
      // navigate(SCREENS.RegisterStepTwo)
    }
  };

  // renderInputRightClose = () => {
  //   return (
  //     <BYTouchable>
  //       <MaterialIcons name="cancel" style={styles.closeIcon} />
  //     </BYTouchable>
  //   );
  // };

  render() {
    const {
      i18n,
      msisdn,
      handleSubmit,
      // navigation: { goBack, navigate },
      loading,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          {loading && <Loader absolutePosition />}
          <Field
            name="otp"
            component={InputRight}
            inputRight={<ReadSeconds i18n={i18n} msisdn={msisdn} />}
            placeholder={i18n.pleaseEnterSMSVerificationCode}
            keyboardType="numeric"
            autoFocus
          />
          <Field
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder={i18n.pleaseEnter820CharactersOrNumbers}
            secureTextEntry
          />
          <Field
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{ marginBottom: 45 }}
            placeholder={i18n.pleaseEnterPasswordAgain}
            secureTextEntry
          />
          <BYButton
            text={i18n.register}
            style={{ marginBottom: 30 }}
            onPress={handleSubmit(this.submit)}
          />
        </ScrollView>
      </View>
    );
  }
}

RegisterStepTwo = reduxForm({
  form: 'RegisterStepTwo',
  validate,
})(RegisterStepTwo);

export default connectLocalization(
  connect(
    () => {
      console.log();
      return (state, props) => {
        const {
          form: { RegisterStepOne },
          register,
        } = state;
        const {
          navigation: {
            state: {
              params: { msisdn },
            },
          },
        } = props;
        return {
          msisdn,
          registerStepOneValues: RegisterStepOne ? RegisterStepOne.values : '',
          loading: register.loading,
        };
      };
    },
    {
      ...registerActionCreators,
    },
  )(RegisterStepTwo),
);
