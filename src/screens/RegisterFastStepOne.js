/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SCREENS, WINDOW_HEIGHT, PHONE_EXPR } from '../common/constants';
import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import { connectLocalization } from '../components/Localization';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class RegisterFastStepOne extends Component {
  handleOnPressSubmit() {
    const {
      i18n,
      // msisdn,
      navigation: { navigate },
      formValue,
    } = this.props;
    console.log(formValue);
    // if (!formValue) return false;
    if (!PHONE_EXPR.test(formValue.phone)) {
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
    // otpFetch(msisdn);
    navigate(SCREENS.RegisterFastStepTwo, { msisdn: formValue.phone });
    return true;
  }

  render() {
    const {
      // navigation: { navigate },
      i18n,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <Field
          name="phone"
          component={InputCountry}
          style={{ marginBottom: 70 }}
          keyboardType="phone-pad"
          // returnKeyType="next"
          autoFocus
          i18n={i18n}
        />
        <BYButton
          text={i18n.nextStep}
          onPress={() => this.handleOnPressSubmit()}
          // onPress={() => navigate(SCREENS.RegisterFastStepTwo)}
        />
        <View style={{ flex: 1, minHeight: WINDOW_HEIGHT * 0.2 }} />
        {/* <OtherLogin /> */}
      </View>
    );
  }
}

RegisterFastStepOne = reduxForm({
  form: 'RegisterFastStepOne',
})(RegisterFastStepOne);

export default connectLocalization(
  connect(
    state => {
      const {
        form: { RegisterFastStepOne: RegisterFastStepOneX },
      } = state;
      return {
        formValue: RegisterFastStepOneX ? RegisterFastStepOneX.values : '',
      };
    },
    {
      ...modalActionCreators,
    },
  )(RegisterFastStepOne),
);
