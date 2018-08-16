/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
// import { PRIMARY_COLOR } from '../styles/variables';
import { SCREENS, WINDOW_HEIGHT } from '../common/constants';
import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import { connectLocalization } from '../components/Localization';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class RegisterFastStepOne extends Component {
  render() {
    const {
      navigation: { navigate },
      i18n,
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
          onPress={() => navigate(SCREENS.RegisterFastStepTwo)}
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

export default connectLocalization(RegisterFastStepOne);
