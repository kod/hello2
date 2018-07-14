import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, Text, View, ScrollView, Keyboard, DeviceEventEmitter, } from 'react-native';
import OverlaySpinner from 'react-native-loading-spinner-overlay';

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from "../common/constants";

import { SCREENS } from '../common/constants';

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import InputRight from '../components/InputRight';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import NavSidesText from '../components/NavSidesText';
import OtherLogin from '../components/OtherLogin';

import * as authActionCreators from "../common/actions/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // position: 'relative',
  },
});

const validate = (values, props) => {
  const { phone, password } = values;
  const { i18n } = props;
  const errors = {};

  if (!phone) {
    errors.phone = i18n.pleaseEnterYourPhoneNumber;
  }
  if (!password) {
    errors.password = i18n.pleaseEnterThePassword;
  }
  return errors;
};

class Login extends React.Component {
  componentDidMount() {
    const {
      navigation: { goBack, navigate },
    } = this.props;

    this.closeLoginScreen = DeviceEventEmitter.addListener(
      'closeLoginScreen',
      () => {
        goBack()
      },
    );
  }

  componentWillUnmount() {
    this.closeLoginScreen.remove();
  }
  
  renderInputRight = () => {
    const {
      navigation: { goBack, navigate },
    } = this.props;

    return (
      <BYTouchable style={{ marginRight: SIDEINTERVAL }} onPress={() => navigate(SCREENS.ForgotPasswordOne)}>
        <Text style={{ marginLeft: 0, color: '#666', fontSize: 11, borderBottomColor: '#666', borderBottomWidth: 1 }}>forgot password?</Text>
      </BYTouchable>
    );
  };

  submit = data => {
    const { login } = this.props;
    const { phone, password } = data;
    if (phone && password) {
      Keyboard.dismiss();
      login(phone, password);
    }
  };

  // 1212312
  render() {
    const {
      navigation: { goBack, navigate },
      handleSubmit,
      i18n,
      auth: { loading },
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <Field
          name="phone"
          component={InputCountry}
          placeholder={i18n.pleaseEnterYourPhoneNumber}
          keyboardType={'phone-pad'}
          returnKeyType={'next'}
        />
        <Field
          name="password"
          component={InputRight}
          inputRight={this.renderInputRight()} 
          styleWrap={{ marginBottom: 75 }}
          placeholder={i18n.pleaseEnterThePassword}
          returnKeyType={'done'}
          secureTextEntry={true}
        />
        <BYButton text={i18n.login} style={{ marginBottom: 30 }} onPress={handleSubmit(this.submit)} />
        <NavSidesText 
          textLeft={'Register now?'} 
          textRight={'Log in via SMS?'} 
          navigateLeft={() => navigate(SCREENS.RegisterStepOne)} 
          navigateRight={() => navigate(SCREENS.RegisterFastStepOne)} 
        />
        <View style={{flex: 1}} ></View>
        {/* <OtherLogin /> */}
        <OverlaySpinner visible={loading} />
      </View>
    );
  }
}

Login = reduxForm({
  form: 'login',
  // destroyOnUnmount: false,
  validate,
})(Login);

export default connectLocalization(
  connect(state => {
    return {
      auth: state.auth,
    }
  }, {
    ...authActionCreators
  })(Login)
);
