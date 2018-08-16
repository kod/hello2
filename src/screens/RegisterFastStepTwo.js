/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SCREENS } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
// import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import ReadSeconds from '../components/ReadSeconds';
import Error from '../components/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  // second: {
  //   height: 20,
  //   minWidth: WINDOW_WIDTH * 0.1,
  //   paddingLeft: WINDOW_WIDTH * 0.02,
  //   paddingRight: WINDOW_WIDTH * 0.02,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 14,
  //   borderWidth: 1,
  //   borderColor: '#0076F7',
  // },
  // secondText: {
  //   color: '#0076F7',
  //   fontSize: 11
  // },
  // closeIcon: {
  //   fontSize: 18,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   color: '#ccc',
  // },
});

class RegisterFastStepTwo extends Component {
  // renderInputRightClose = () => {
  //   return (
  //     <BYTouchable>
  //       <MaterialIcons name="cancel" style={styles.closeIcon} />
  //     </BYTouchable>
  //   );
  // };

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
            styleWrap={{ marginBottom: 10, marginTop: 10 }}
            textInputProps={{
              placeholder: i18n.pleaseEnterSMSVerificationCode,
              keyboardType: 'numeric',
            }}
          />

          <Error text={i18n.inputError} styleWrap={{ marginBottom: 50 }} />
          <BYButton
            text={i18n.login}
            style={{ marginBottom: 30 }}
            onPress={() => navigate(SCREENS.Login)}
          />
        </ScrollView>
      </View>
    );
  }
}

RegisterFastStepTwo = reduxForm({
  form: 'RegisterFastStepTwo',
})(RegisterFastStepTwo);

export default connectLocalization(RegisterFastStepTwo);
