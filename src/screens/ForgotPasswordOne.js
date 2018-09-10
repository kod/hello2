/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// import { PRIMARY_COLOR } from '../styles/variables';
import { SCREENS, WINDOW_HEIGHT, PHONE_EXPR } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
// import OtherLogin from '../components/OtherLogin';
import { connectLocalization } from '../components/Localization';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class ForgotPasswordOne extends Component {
  componentDidMount() {
    const {
      initialize,
      msisdn,
      // msisdn,
    } = this.props;

    if (msisdn) {
      initialize({ phone: msisdn });
    }
  }

  handleOnPressSubmit() {
    const {
      i18n,
      // msisdn,
      navigation: { navigate },
      formValue,
    } = this.props;
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
    navigate(SCREENS.ForgotPasswordTwo, { msisdn: formValue.phone });
    return true;
  }

  render() {
    const {
      i18n,
      msisdn,
      // navigation,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <Field
          name="phone"
          component={InputCountry}
          keyboardType="phone-pad"
          style={{ marginBottom: 70 }}
          value={msisdn}
          editable={msisdn.length === 0}
          // autoFocus
          i18n={i18n}
        />
        <BYButton
          text={i18n.nextStep}
          onPress={() => this.handleOnPressSubmit()}
        />
        <View style={{ flex: 1, minHeight: WINDOW_HEIGHT * 0.2 }} />
        {/* <OtherLogin /> */}
      </View>
    );
  }
}

ForgotPasswordOne = reduxForm({
  form: 'forgotpasswordone',
  // destroyOnUnmount: false,
  // validate,
})(ForgotPasswordOne);

// export default connectLocalization(ForgotPasswordOne);

export default connectLocalization(
  connect(
    state => {
      const {
        form: { forgotpasswordone: forgotpasswordoneX },
        login,
      } = state;
      return {
        msisdn: login.user ? login.user.msisdn : '',
        formValue: forgotpasswordoneX ? forgotpasswordoneX.values : '',
      };
    },
    {
      ...modalActionCreators,
    },
  )(ForgotPasswordOne),
);
