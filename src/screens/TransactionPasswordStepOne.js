/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import {
  // Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import { connectLocalization } from '../components/Localization';

import * as otpActionCreators from '../common/actions/otp';

import { SCREENS, PHONE_EXPR } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 30,
  },
  button: {
    marginBottom: 20,
  },
});

class TransactionPasswordStepOne extends Component {
  constructor(props) {
    super(props);
    this.handleOnPressSubmit = this.handleOnPressSubmit.bind(this);
  }

  componentDidMount() {
    const {
      msisdn,
      initialize,
      // msisdn,
    } = this.props;
    initialize({ phone: msisdn });
  }

  handleOnPressSubmit() {
    const {
      i18n,
      formValue,
      otpFetch,
      navigation: { navigate },
    } = this.props;
    if (!formValue) return false;
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
    otpFetch(formValue.phone);
    navigate(SCREENS.TransactionPasswordStepTwo);
    return true;
  }

  render() {
    const {
      // navigation: { goBack, navigate },
      i18n,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="phone"
            component={InputCountry}
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit
            onSubmitEditing={this.handleOnPressSubmit}
            editable={false}
          />
          <BYButton
            text={i18n.nextStep}
            style={styles.button}
            onPress={() => this.handleOnPressSubmit()}
          />
        </ScrollView>
      </View>
    );
  }
}

TransactionPasswordStepOne = reduxForm({
  form: 'TransactionPasswordStepOne',
})(TransactionPasswordStepOne);

export default connectLocalization(
  connect(
    () => {
      console.log();
      return state => {
        const {
          login,
          // form: { TransactionPasswordStepOne },
        } = state;
        return {
          msisdn: login.user ? login.user.msisdn : '',
          formValue: TransactionPasswordStepOne
            ? TransactionPasswordStepOne.values
            : '',
        };
      };
    },
    {
      ...otpActionCreators,
    },
  )(TransactionPasswordStepOne),
);
