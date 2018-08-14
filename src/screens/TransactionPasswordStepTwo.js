/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { WINDOW_WIDTH } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from '../components/BYButton';
import InputRight from '../components/InputRight';
import BYTouchable from '../components/BYTouchable';
import ReadSeconds from '../components/ReadSeconds';
import { connectLocalization } from '../components/Localization';

import * as modifyPayPasswordActionCreators from '../common/actions/modifyPayPassword';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  second: {
    height: 20,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
    marginRight: 1,
  },
  secondText: {
    color: '#0076F7',
    fontSize: 11,
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

class TransactionPasswordStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // seconds: 0,
      // ing: false,
    };
  }

  componentDidMount() {
    // this.readSeconds();
  }

  renderInputRightClose = () => (
    <BYTouchable>
      <MaterialIcons name="cancel" style={styles.closeIcon} />
    </BYTouchable>
  );

  handleOnPressSubmit() {
    const {
      i18n,
      formValue,
      modifyPayPasswordFetch,
      // navigation: { state },
    } = this.props;
    if (!formValue) return false;
    if (!formValue.code) {
      Alert.alert(
        '',
        'Vui lòng nhập mã xác nhận',
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

    if (!formValue.password) {
      Alert.alert(
        '',
        'Vui lòng nhập 6 chữ số',
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
        'Nhập lại Mật mã giao dịch',
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
        'Hai lần nhập mật mã giao dịch không giống nhau',
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
    return modifyPayPasswordFetch(formValue.password, formValue.code);
  }

  render() {
    const { i18n } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps="always">
          <Field
            name="code"
            component={InputRight}
            inputRight={<ReadSeconds />}
            // inputRight={this.renderInputRightCode()}
            placeholder="Vui lòng nhập mã xác nhận"
            keyboardType="numeric"
            // onSubmitEditing={() => { this.password.focus(); }}
            // blurOnSubmit={false}
            // autoFocus={true}
          />
          <Field
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder="Vui lòng nhập 6 chữ số"
            secureTextEntry
            keyboardType="numeric"
            // onSubmitEditing={() => { this.repassword.focus(); }}
            // ref={input => { this.password = input }}
            // blurOnSubmit={false}
          />
          <Field
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{ marginBottom: 45 }}
            placeholder="Nhập lại Mật mã giao dịch"
            secureTextEntry
            keyboardType="numeric"
            // ref={input => { this.repassword = input }}
          />
          <BYButton
            text={i18n.submit}
            style={{ marginBottom: 30 }}
            onPress={() => this.handleOnPressSubmit()}
          />
        </ScrollView>
      </View>
    );
  }
}

TransactionPasswordStepTwo = reduxForm({
  form: 'TransactionPasswordStepTwo',
})(TransactionPasswordStepTwo);

export default connectLocalization(
  connect(
    state => {
      const {
        form: { TransactionPasswordStepTwoX },
      } = state;
      return {
        formValue: TransactionPasswordStepTwoX
          ? TransactionPasswordStepTwoX.values
          : '',
      };
    },
    {
      ...modifyPayPasswordActionCreators,
    },
  )(TransactionPasswordStepTwo),
);
