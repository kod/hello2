import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import { PRIMARY_COLOR } from '../styles/variables';
import { SCREENS, WINDOW_HEIGHT } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import OtherLogin from '../components/OtherLogin';
import { connectLocalization } from '../components/Localization';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class ForgotPasswordOne extends React.Component {
  render() {
    const {
      navigation: { goBack, navigate },
      navigation
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <Field 
          name="phone"
          component={InputCountry}
          style={{marginBottom: 70}}
        />
        <BYButton text={'Next'} onPress={() => navigate(SCREENS.ForgotPasswordTwo)} />
        <View style={{flex: 1, minHeight: WINDOW_HEIGHT * 0.2}}></View>
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
