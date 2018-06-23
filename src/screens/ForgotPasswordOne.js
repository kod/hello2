import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import { SCREENS } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import OtherLogin from '../components/OtherLogin';

import { WINDOW_HEIGHT } from '../styles/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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
        <OtherLogin />
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <Field 
            name="phone"
            component={InputCountry}
            style={{marginBottom: 70}}
          />
          <BYButton text={'Next'} onPress={() => navigate(SCREENS.ForgotPasswordTwo)} />
        </ScrollView>
      </View>
    );
  }
}

ForgotPasswordOne = reduxForm({
  form: 'forgotpasswordone',
  // destroyOnUnmount: false,
  // validate,
})(ForgotPasswordOne);

export default ForgotPasswordOne;
