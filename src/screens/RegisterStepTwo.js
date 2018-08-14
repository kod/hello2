import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
import BYTouchable from '../components/BYTouchable';
import ReadSeconds from '../components/ReadSeconds';
import Loader from '../components/Loader';
import { connectLocalization } from '../components/Localization';

import { SCREENS } from '../common/constants';

import * as registerActionCreators from "../common/actions/register";

import { PHONE_EXPR, PWD_EXPR } from '../common/constants';

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
})

const validate = (values, props) => {
  const { 
    otp = '',
    password = '',
    repassword = '',
   } = values;
  const { i18n } = props;
  const errors = {};

  if (!otp) {
    errors.otp = 'place enter the code';
  }
  if (!PWD_EXPR.test(password)) {
    errors.password = '8-20 password';
  }
  if (password !== repassword) {
    errors.repassword = 'confirm password';
  }
  return errors;
};

class RegisterStepTwo extends Component {
  submit = data => {
    const {
      otp,
      password,
      repassword,
    } = data;
    const {
      registerFetch,
      navigation: { goBack, navigate },
      registerStepOneValues: { phone, inviterno },
    } = this.props;
    if (otp && password && repassword) {
      Keyboard.dismiss();
      registerFetch({
        otp,
        password,
        repassword,
        msisdn: phone,
        inviterno: inviterno,
      });
      // navigate(SCREENS.RegisterStepTwo)
    }
  }

  renderInputRightCode = () => {
    return (
      <View style={styles.second}>
        <Text style={styles.secondText}>gửi mã</Text>
      </View>
    );
  };
  
  renderInputRightClose = () => {
    return (
      <BYTouchable>
        <MaterialIcons name="cancel" style={styles.closeIcon} />
      </BYTouchable>
    );
  };

  render() {
    const {
      handleSubmit,
      navigation: { goBack, navigate },
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
            inputRight={<ReadSeconds />}
            placeholder={'place enter the code'}
            keyboardType="numeric"
          />
          <Field 
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder={'8-20 password'}
            secureTextEntry
          />
          <Field 
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{ marginBottom: 45 }}
            placeholder="confirm password"
            secureTextEntry
          />

          <BYButton text={'Register'} style={{ marginBottom: 30 }} onPress={handleSubmit(this.submit)} />
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
      return (state, props) => {
        const {
          form: { RegisterStepOne },
          register,
        } = state;
        return {
          registerStepOneValues: RegisterStepOne ? RegisterStepOne.values : '',
          loading: register.loading,
        }
      }
    },
    {
      ...registerActionCreators,
    }
  )(RegisterStepTwo),
);
