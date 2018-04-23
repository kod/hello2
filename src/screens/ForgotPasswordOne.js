import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TextInput, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import { globalStyleVariables, globalStyles } from '../styles';

import { SCREENS } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import OtherLogin from '../components/OtherLogin';

import { WINDOW_HEIGHT } from '../styles/variables';

const styles = StyleSheet.create({});

class ForgotPasswordOne extends React.Component {
  render() {
    const {
      navigation: { goBack, navigate },
      navigation
    } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', position: 'relative', height: globalStyleVariables.WINDOW_HEIGHT }}>
        <BYHeader />
        <OtherLogin />
        <ScrollView>
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
