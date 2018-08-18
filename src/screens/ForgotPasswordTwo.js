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
import { LOGIN_PASSWORD_EXPR, SCREENS, MODAL_TYPES } from '../common/constants';
import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
// import BYTouchable from '../components/BYTouchable';
import { connectLocalization } from '../components/Localization';
import ReadSeconds from '../components/ReadSeconds';

import * as changePasswordActionCreators from '../common/actions/changePassword';
import * as modalActionCreators from '../common/actions/modal';

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
  componentDidMount() {
    const {
      i18n,
      navigation: {
        pop,
        // goBack,
      },
    } = this.props;
    this.screenListener = DeviceEventEmitter.addListener(
      SCREENS.ForgotPasswordTwo,
      () => {
        Alert.alert('', i18n.success, [
          {
            text: i18n.confirm,
            onPress: () => {
              pop(2);
              // NavigatorService.navigate(SCREENS.Card);
            },
          },
        ]);
        // goBack();
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { loading: prevLoading } = this.props;
    const { loading, openModal, closeModal } = nextProps;

    // if (prevAddLoading !== addLoading) {
    //   if (addLoading) {
    //     openModal(MODAL_TYPES.LOADER);
    //   } else {

    //   }
    // }

    if (prevLoading !== loading) {
      if (loading === false) {
        closeModal();
      } else {
        openModal(MODAL_TYPES.LOADER);
      }
    }
  }

  componentWillUnmount() {
    this.screenListener.remove();
  }

  handleOnPressSubmit() {
    const {
      i18n,
      formValue,
      changePasswordFetch,
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

    if (!formValue.password || !LOGIN_PASSWORD_EXPR.test(formValue.password)) {
      Alert.alert(
        '',
        i18n.pleaseEnter820CharactersOrNumbers,
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

    if (!formValue.repassword) {
      Alert.alert(
        '',
        i18n.pleaseEnterPasswordAgain,
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

    if (formValue.password !== formValue.repassword) {
      Alert.alert(
        '',
        i18n.theWwoPasswordsAreNotSame,
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
    return changePasswordFetch(
      msisdn,
      formValue.password,
      formValue.code,
      SCREENS.ForgotPasswordTwo,
    );
  }

  render() {
    const {
      i18n,
      msisdn,
      // navigation: { navigate },
    } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="code"
            component={InputRight}
            inputRight={<ReadSeconds i18n={i18n} msisdn={msisdn} />}
            placeholder={i18n.pleaseEnterSMSVerificationCode}
            keyboardType="numeric"
            autoFocus
          />
          <Field
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder={i18n.pleaseEnter820CharactersOrNumbers}
            secureTextEntry
          />
          <Field
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{ marginBottom: 45 }}
            placeholder={i18n.pleaseEnterPasswordAgain}
            secureTextEntry
          />
          <BYButton
            text={i18n.confirm}
            style={{ marginBottom: 30 }}
            onPress={() => this.handleOnPressSubmit()}
            // onPress={() => navigate(SCREENS.RegisterStepOne)}
          />
        </ScrollView>
      </View>
    );
  }
}

ForgotPasswordTwo = reduxForm({
  form: 'ForgotPasswordTwo',
})(ForgotPasswordTwo);

// export default connectLocalization(ForgotPasswordTwo);

export default connectLocalization(
  connect(
    (state, props) => {
      const {
        form: { ForgotPasswordTwo: ForgotPasswordTwoX },
        changePassword,
        // login,
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
        loading: changePassword.loading,
        formValue: ForgotPasswordTwoX ? ForgotPasswordTwoX.values : '',
      };
    },
    {
      ...changePasswordActionCreators,
      ...modalActionCreators,
    },
  )(ForgotPasswordTwo),
);
