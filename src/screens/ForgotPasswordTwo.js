/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SCREENS } from '../common/constants';
import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import ReadSeconds from '../components/ReadSeconds';
import Error from '../components/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeIcon: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ccc',
  },
});

class ForgotPasswordTwo extends Component {
  renderInputRightClose = () => (
    <BYTouchable>
      <MaterialIcons name="cancel" style={styles.closeIcon} />
    </BYTouchable>
  );

  render() {
    const {
      i18n,
      navigation: { navigate },
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="code"
            component={InputRight}
            inputRight={<ReadSeconds i18n={i18n} />}
            textInputProps={{
              placeholder: i18n.pleaseEnterSMSVerificationCode,
              keyboardType: 'numeric',
            }}
          />
          <Field
            name="password"
            component={InputRight}
            inputRight={this.renderInputRightClose()}
            textInputProps={{
              placeholder: i18n.pleaseEnter816CharactersOrNumbers,
              secureTextEntry: true,
            }}
            secureTextEntry
          />
          <Field
            name="repassword"
            component={InputRight}
            inputRight={this.renderInputRightClose()}
            styleWrap={{ marginBottom: 5 }}
            textInputProps={{
              placeholder: i18n.pleaseEnterPasswordAgain,
              secureTextEntry: true,
            }}
            secureTextEntry
          />

          <Error text={i18n.inputError} styleWrap={{ marginBottom: 45 }} />
          <BYButton
            text={i18n.register}
            style={{ marginBottom: 30 }}
            onPress={() => navigate(SCREENS.RegisterStepOne)}
          />
        </ScrollView>
      </View>
    );
  }
}

ForgotPasswordTwo = reduxForm({
  form: 'ForgotPasswordTwo',
})(ForgotPasswordTwo);

export default connectLocalization(ForgotPasswordTwo);
