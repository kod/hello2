import React from 'react';
import { StyleSheet, Text, View, ScrollView, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

import BYHeader from '../components/BYHeader';
import BYButton from "../components/BYButton";
import InputRight from "../components/InputRight";
import BYTouchable from '../components/BYTouchable';
import ReadSeconds from "../components/ReadSeconds";

import * as modifyPayPasswordActionCreators from "../common/actions/modifyPayPassword";

import { SCREENS } from '../common/constants';

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
})

class TransactionPasswordStepTwo extends React.Component {
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

  renderInputRightClose = () => {
    return (
      <BYTouchable>
        <MaterialIcons name="cancel" style={styles.closeIcon} />
      </BYTouchable>
    );
  };

  handleOnPressSubmit() {
    const {
      formValue,
      modifyPayPasswordFetch,
      navigation: { state },
    } = this.props;
    if (!formValue) return false;
    if (!formValue.code) if (Platform.OS === 'android') ToastAndroid.show('Vui lòng nhập mã xác nhận', ToastAndroid.SHORT);
    if (!formValue.password) if (Platform.OS === 'android') ToastAndroid.show('Vui lòng nhập 6 chữ số', ToastAndroid.SHORT);
    if (!formValue.repassword) if (Platform.OS === 'android') ToastAndroid.show('Nhập lại Mật mã giao dịch', ToastAndroid.SHORT);
    if (formValue.password !== formValue.repassword) if (Platform.OS === 'android') ToastAndroid.show('Hai lần nhập mật mã giao dịch không giống nhau', ToastAndroid.SHORT);
    modifyPayPasswordFetch(formValue.password, formValue.code);
  }

  render() {
    const { navigation: { goBack, navigate } } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView keyboardShouldPersistTaps={'always'}>

          <Field 
            name="code"
            component={InputRight}
            inputRight={<ReadSeconds />}
            // inputRight={this.renderInputRightCode()}
            placeholder={'Vui lòng nhập mã xác nhận'}
            keyboardType={'numeric'}
            // onSubmitEditing={() => { this.password.focus(); }}
            // blurOnSubmit={false}
            // autoFocus={true}
          />
          <Field 
            name="password"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            placeholder={'Vui lòng nhập 6 chữ số'}
            secureTextEntry={true}
            keyboardType={'numeric'}
            // onSubmitEditing={() => { this.repassword.focus(); }}
            // ref={(input) => { this.password = input }}
            // blurOnSubmit={false}
          />
          <Field 
            name="repassword"
            component={InputRight}
            // inputRight={this.renderInputRightClose()}
            styleWrap={{marginBottom: 45}}
            placeholder={'Nhập lại Mật mã giao dịch'}
            secureTextEntry={true}
            keyboardType={'numeric'}
            // ref={(input) => { this.repassword = input }}
          />
          <BYButton text={'Submit'} style={{ marginBottom: 30 }} onPress={() => this.handleOnPressSubmit()} />
        </ScrollView>
      </View>
    );
  }
}

TransactionPasswordStepTwo = reduxForm({
  form: 'TransactionPasswordStepTwo',
})(TransactionPasswordStepTwo);

export default connect(
  () => {
    return (state, props) => {
      const {
        form: { TransactionPasswordStepTwo },
      } = state;
      return {
        formValue: TransactionPasswordStepTwo ? TransactionPasswordStepTwo.values : '',
      }
    }
  },
  {
    ...modifyPayPasswordActionCreators,
  }
)(TransactionPasswordStepTwo);
