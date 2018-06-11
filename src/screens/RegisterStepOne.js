import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import { globalStyleVariables, globalStyles } from '../styles';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import NavSidesText from '../components/NavSidesText';
import BYTextInput from "../components/BYTextInput";

import { SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
});

class RegisterStepOne extends React.Component {
  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />

        <ScrollView keyboardShouldPersistTaps={'always'}>
          <Field 
            name="phone"
            component={InputCountry}
            style={{marginBottom: 30}}
          />
          <View style={{ paddingLeft: globalStyleVariables.SIDEINTERVAL, paddingRight: globalStyleVariables.SIDEINTERVAL }}>
            <BYTextInput style={{ flex: 1, paddingLeft: globalStyleVariables.SIDEINTERVAL, backgroundColor: '#E0E3EF', marginBottom: 75 }} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'Please enter the invitation code.(选填)'} placeholderTextColor={'#6D7592'} />
          </View>
          <BYButton text={'Next step'} style={{ marginBottom: 20 }} onPress={() => navigate(SCREENS.RegisterStepTwo)} />
          <NavSidesText textLeft={'Already have an account?'} navigateLeft={() => goBack()} />
        </ScrollView>
      </View>
    );
  }
}

RegisterStepOne = reduxForm({
  form: 'RegisterStepOne',
})(RegisterStepOne);

export default RegisterStepOne;
