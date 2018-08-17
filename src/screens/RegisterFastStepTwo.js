/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SCREENS } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
// import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import ReadSeconds from '../components/ReadSeconds';
// import Error from '../components/Error';
import * as loginActionCreators from '../common/actions/login';
import * as modalActionCreators from '../common/actions/modal';

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
  constructor(props) {
    super(props);
    this.handleOnPressSubmit = this.handleOnPressSubmit.bind(this);
  }

  componentDidMount() {
    const {
      navigation: { pop },
    } = this.props;

    this.screenListener = DeviceEventEmitter.addListener(
      SCREENS.RegisterFastStepTwo,
      () => {
        pop(3);
      },
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   const { loading: prevLoading } = this.props;
  //   const { loading, openModal, closeModal } = nextProps;

  //   if (prevLoading !== loading) {
  //     if (loading === false) {
  //       closeModal();
  //     } else {
  //       openModal(MODAL_TYPES.LOADER);
  //     }
  //   }
  // }

  componentWillUnmount() {
    this.screenListener.remove();
  }

  handleOnPressSubmit() {
    const {
      i18n,
      formValue,
      loginFetch,
      msisdn,
      // navigation: { state },
    } = this.props;
    if (!formValue) return false;
    if (!formValue.code) {
      Alert.alert(
        '',
        i18n.pleaseEnterSMSVerificationCode,
        [
          {
            text: i18n.confirm,
            onPress: () => {},
          },
        ],
        // { cancelable: false },
      );
      return false;
    }

    return loginFetch({
      msisdn,
      otp: formValue.code,
      screen: SCREENS.RegisterFastStepTwo,
    });
  }

  render() {
    const {
      i18n,
      msisdn,
      // navigation: { navigate },
      handleSubmit,
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="code"
            component={InputRight}
            inputRight={<ReadSeconds i18n={i18n} msisdn={msisdn} />}
            styleWrap={{ marginBottom: 10, marginTop: 10 }}
            placeholder={i18n.pleaseEnterSMSVerificationCode}
            keyboardType="numeric"
            autoFocus
          />

          {/* <Error text={i18n.inputError} styleWrap={{ marginBottom: 50 }} /> */}
          <BYButton
            text={i18n.login}
            style={{ marginBottom: 30 }}
            onPress={handleSubmit(this.handleOnPressSubmit)}
          />
        </ScrollView>
      </View>
    );
  }
}

RegisterFastStepTwo = reduxForm({
  form: 'RegisterFastStepTwo',
})(RegisterFastStepTwo);

// export default connectLocalization(RegisterFastStepTwo);

export default connectLocalization(
  connect(
    (state, props) => {
      const {
        // changePassword,
        login,
        form: { RegisterFastStepTwo: RegisterFastStepTwoX },
      } = state;
      const {
        navigation: {
          state: {
            params: { msisdn },
          },
        },
      } = props;
      return {
        msisdn,
        formValue: RegisterFastStepTwoX ? RegisterFastStepTwoX.values : '',
        loading: login.loading,
      };
    },
    {
      ...loginActionCreators,
      ...modalActionCreators,
    },
  )(RegisterFastStepTwo),
);
