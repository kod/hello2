/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';

// import { PRIMARY_COLOR } from '../styles/variables';
import { SCREENS, WINDOW_HEIGHT } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
// import OtherLogin from '../components/OtherLogin';
import { connectLocalization } from '../components/Localization';
import i18n from '../common/reducers/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class ForgotPasswordOne extends Component {
  render() {
    const {
      navigation: { navigate },
      // navigation,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <Field
          name="phone"
          component={InputCountry}
          style={{ marginBottom: 70 }}
        />
        <BYButton
          text={i18n.nextStep}
          onPress={() => navigate(SCREENS.ForgotPasswordTwo)}
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

export default connectLocalization(ForgotPasswordOne);
