import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, Text, View, ScrollView, Keyboard, } from 'react-native';

import { globalStyleVariables, globalStyles } from '../styles';

import { SCREENS } from '../common/constants';

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import InputRight from '../components/InputRight';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import NavSidesText from '../components/NavSidesText';
import BYStatusBar from '../components/BYStatusBar';
import OtherLogin from '../components/OtherLogin';
import Error from '../components/Error';

import { WINDOW_HEIGHT } from '../styles/variables';

const styles = StyleSheet.create({});

const validate = (values, props) => {
  const { email, password } = values;
  const { i18n } = props;
  const errors = {};
  console.log(values);
  if (!email) {
    errors.email = 'i18n.loginValidateEmailOrPixivId';
  }
  if (!password) {
    errors.password = 'i18n.loginValidatePassword';
  }
  return errors;
};

class Login extends React.Component {
  renderInputRight = () => {
    const {
      navigation: { goBack, navigate },
    } = this.props;

    return (
      <BYTouchable style={{ marginRight: globalStyleVariables.SIDEINTERVAL }} onPress={() => navigate(SCREENS.ForgotPasswordOne)}>
        <Text style={{ marginLeft: 0, color: '#666', fontSize: 11, borderBottomColor: '#666', borderBottomWidth: 1 }}>forgot password?</Text>
      </BYTouchable>
    );
  };

  submit = data => {
    console.log(data);
    // const { login } = this.props;
    // const { email, password } = data;
    // if (email && password) {
    //   Keyboard.dismiss();
    //   login(email, password);
    // }
  };

  
  render() {
    const {
      navigation: { goBack, navigate },
      handleSubmit,
    } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', position: 'relative', height: globalStyleVariables.WINDOW_HEIGHT }}>
        <BYStatusBar />
        <BYHeader />
        <OtherLogin />

        <ScrollView>
          <Field
            name="email"
            component={InputCountry}
            errElement={<Error text={'input error'} styleWrap={{ marginBottom: 0, marginTop: 5 }} />}
          />
          <Field
            name="password"
            component={InputRight}
            inputRight={this.renderInputRight()} 
            styleWrap={{ marginBottom: 75 }}
          />
          <BYButton text={'Login'} style={{ marginBottom: 30 }} onPress={handleSubmit(this.submit)} />
          <NavSidesText textLeft={'Register now?'} textRight={'Log in via SMS?'} navigateLeft={() => navigate(SCREENS.RegisterStepOne)} navigateRight={() => navigate(SCREENS.RegisterFastStepOne)} />
        </ScrollView>
      </View>
    );
  }
}

const LoginForm = reduxForm({
  form: 'login',
  // destroyOnUnmount: false,
  validate,
})(Login);

export default connectLocalization(LoginForm);
