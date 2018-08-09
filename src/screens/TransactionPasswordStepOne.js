import React from 'react';
import { Text, View, ScrollView, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import BYHeader from '../components/BYHeader';
import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';

import * as otpActionCreators from "../common/actions/otp";

import { SCREENS, PHONEEXPR } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 30
  },
  button: {
    marginBottom: 20 
  },
});

class TransactionPasswordStepOne extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnPressSubmit = this.handleOnPressSubmit.bind(this);
  }

  componentDidMount() {
    const {
      msisdn,
    } = this.props;
    this.props.initialize({ phone: msisdn });
  }
  
  handleOnPressSubmit() {
    const {
      formValue,
      otpFetch,
      navigation: { goBack, navigate, state },
    } = this.props;
    if (!formValue) return false;
    if (!PHONEEXPR.test(formValue.phone)) {
      if (Platform.OS === 'android')
        ToastAndroid.show('định dạng số điện thoại sai', ToastAndroid.SHORT);
    }
    otpFetch(formValue.phone);
    navigate(SCREENS.TransactionPasswordStepTwo);
  }
  
  render() {

    const {
      navigation: { goBack, navigate },
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
            returnKeyType = { "next" }
            blurOnSubmit={true}
            onSubmitEditing={this.handleOnPressSubmit}
            editable={false}
          />
          <BYButton text={'Next step'} style={styles.button} onPress={() => this.handleOnPressSubmit()} />
        </ScrollView>
      </View>
    );
  }
}

TransactionPasswordStepOne = reduxForm({
  form: 'TransactionPasswordStepOne',
})(TransactionPasswordStepOne);

export default connect(
  () => {
    return (state, props) => {
      const {
        auth,
        form: { TransactionPasswordStepOne },
      } = state;
      return {
        msisdn: auth.user ? auth.user.msisdn : '',
        formValue: TransactionPasswordStepOne ? TransactionPasswordStepOne.values : '',
      }
    }
  },
  {
    ...otpActionCreators
  }
)(TransactionPasswordStepOne);
