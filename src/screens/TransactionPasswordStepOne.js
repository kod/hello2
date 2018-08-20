/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import {
  Image,
  View,
  // ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';

import BYHeader from '../components/BYHeader';
// import InputCountry from '../components/InputCountry';
import BYButton from '../components/BYButton';
import { connectLocalization } from '../components/Localization';

import * as otpActionCreators from '../common/actions/otp';
import { BORDER_COLOR } from '../styles/variables';
import { SCREENS, SIDEINTERVAL } from '../common/constants';

const viemnamPng = require('../images/viemnam.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  componentInput: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    marginBottom: 20,
  },
  componentWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 20,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 5,
  },
  componentFlag: {
    width: 18,
    resizeMode: Image.resizeMode.contain,
    marginLeft: SIDEINTERVAL,
  },
});

class TransactionPasswordStepOne extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleOnPressSubmit = this.handleOnPressSubmit.bind(this);
  // }

  // componentDidMount() {
  //   const {
  //     msisdn,
  //     // initialize,
  //     // msisdn,
  //   } = this.props;
  //   // initialize({ phone: msisdn });
  // }

  handleOnPressSubmit() {
    const {
      // i18n,
      // msisdn,
      navigation: { navigate },
      // otpFetch,
    } = this.props;
    // if (!formValue) return false;
    // if (!PHONE_EXPR.test(formValue.phone)) {
    //   Alert.alert(
    //     '',
    //     i18n.pleaseEnterCorrectPhoneNumber,
    //     [
    //       {
    //         text: i18n.confirm,
    //         onPress: () => {},
    //       },
    //     ],
    //     // { cancelable: false },
    //   );
    //   return false;
    // }
    // otpFetch(msisdn);
    navigate(SCREENS.TransactionPasswordStepTwo);
  }

  render() {
    const {
      // navigation: { goBack, navigate },
      i18n,
      msisdn,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <View style={styles.componentWrap}>
          <View style={styles.component}>
            <Image source={viemnamPng} style={styles.componentFlag} />
            <TextInput
              placeholder={i18n.pleaseEnterYourPhoneNumber}
              placeholderTextColor="#ccc"
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.componentInput}
              editable={false}
              // onFocus={this.setActiveBorderColor}
              // onBlur={this.setDefaultBorderColor}
              value={msisdn}
            />
          </View>
        </View>
        <BYButton
          text={i18n.nextStep}
          style={styles.button}
          onPress={() => this.handleOnPressSubmit()}
        />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const {
        login,
        // login,
      } = state;
      return {
        msisdn: login.user ? login.user.msisdn : '',
      };
    },
    {
      ...otpActionCreators,
    },
  )(TransactionPasswordStepOne),
);
