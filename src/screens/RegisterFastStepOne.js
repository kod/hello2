import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TextInput, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import { globalStyles } from '../styles';
import { WINDOW_HEIGHT } from '../styles/variables';

import { SCREENS } from '../common/constants';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import OtherLogin from '../components/OtherLogin';
import {  } from "../components/Error";

const styles = StyleSheet.create({});

class RegisterFastStepOne extends React.Component {
  render() {
    const {
      navigation: { goBack, navigate },
      navigation
    } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', position: 'relative', height: WINDOW_HEIGHT }}>
        <BYHeader />
        <OtherLogin />
        <ScrollView>
          <Field 
            name="phone"
            component={InputCountry}
            style={{marginBottom: 70}}
          />
          <BYButton text={'Next'} onPress={() => navigate(SCREENS.RegisterFastStepTwo)} />
        </ScrollView>
      </View>
    );
  }
}

RegisterFastStepOne = reduxForm({
  form: 'RegisterFastStepOne',
})(RegisterFastStepOne);

export default RegisterFastStepOne;
